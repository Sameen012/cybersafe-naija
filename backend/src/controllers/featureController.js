import { Op, fn, col, literal } from 'sequelize';
import { Report, Comment, Alert, sequelize } from '../models/index.js';

const velocityToThreatScore = (count) => {
  if (count <= 0) return 5;
  if (count >= 5) return 100;
  return Math.min(100, count * 20);
};

const scoreToThreatLevel = (score) => {
  if (score >= 70) return 'CRITICAL/BLOCK IMMEDIATELY';
  if (score >= 30) return 'Suspicious';
  return 'Safe';
};

export const searchScam = async (req, res) => {
  const query = req.query.q?.trim();

  if (!query) {
    return res.status(400).json({ message: 'Query parameter q is required' });
  }

  try {
    const reports = await Report.findAll({
      where: {
        scammerIdentity: {
          [Op.like]: `%${query}%`
        }
      },
      order: [['reportedAt', 'DESC']]
    });

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const velocityCount = await Report.count({
      where: {
        scammerIdentity: {
          [Op.like]: `%${query}%`
        },
        reportedAt: {
          [Op.gte]: twentyFourHoursAgo
        }
      }
    });

    const threatScore = velocityToThreatScore(velocityCount);
    const threatLevel = scoreToThreatLevel(threatScore);

    const reportIds = reports.map((report) => report.id);

    const comments = reportIds.length
      ? await Comment.findAll({
          where: { reportId: { [Op.in]: reportIds } },
          order: [['createdAt', 'DESC']],
          limit: 3
        })
      : [];

    return res.json({
      query,
      reportCount: reports.length,
      velocity24h: velocityCount,
      threatScore,
      threatLevel,
      recentComments: comments
    });
  } catch (error) {
    console.error('searchScam error:', error.message);
    return res.status(500).json({ message: 'Failed to run lookup' });
  }
};

export const getTrendingScams = async (_req, res) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  try {
    const trending = await Report.findAll({
      attributes: ['scamType', [fn('COUNT', col('scamType')), 'total']],
      where: {
        reportedAt: {
          [Op.gte]: sevenDaysAgo
        }
      },
      group: ['scamType'],
      order: [[literal('total'), 'DESC']],
      limit: 5
    });

    return res.json({ trending });
  } catch (error) {
    console.error('getTrendingScams error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch trending scams' });
  }
};

export const addComment = async (req, res) => {
  const { id: reportId } = req.params;
  const { userAlias, content, isVictim = false } = req.body;

  if (!userAlias || !content) {
    return res.status(400).json({ message: 'userAlias and content are required' });
  }

  try {
    const report = await Report.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const comment = await Comment.create({ reportId, userAlias, content, isVictim });
    return res.status(201).json({ message: 'Comment added', comment });
  } catch (error) {
    console.error('addComment error:', error.message);
    return res.status(500).json({ message: 'Unable to add comment' });
  }
};

export const getActiveAlerts = async (_req, res) => {
  try {
    const alerts = await Alert.findAll({ where: { isActive: true }, order: [['severity', 'ASC']] });
    return res.json({ alerts });
  } catch (error) {
    console.error('getActiveAlerts error:', error.message);
    return res.status(500).json({ message: 'Unable to fetch alerts' });
  }
};
