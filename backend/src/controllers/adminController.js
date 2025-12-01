import { Report, ScamContent, User } from '../models/index.js';

export const dashboardStats = async (_req, res) => {
  try {
    const [userCount, articleCount, pendingReports] = await Promise.all([
      User.count(),
      ScamContent.count(),
      Report.count({ where: { status: 'pending' } })
    ]);

    return res.json({
      stats: {
        userCount,
        articleCount,
        pendingReports
      }
    });
  } catch (error) {
    console.error('Dashboard stats failed:', error.message);
    return res.status(500).json({ message: 'Unable to load admin dashboard' });
  }
};
