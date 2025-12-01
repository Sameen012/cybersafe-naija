import { Report } from '../models/index.js';

export const submitReport = async (req, res) => {
  try {
    const { scammerPhone, scamLink, description } = req.body;

    if (!scammerPhone || !description) {
      return res.status(400).json({ message: 'scammerPhone and description are required' });
    }

    const report = await Report.create({
      scammerPhone,
      scamLink: scamLink || null,
      description,
      status: 'pending'
    });

    return res.status(201).json({ message: 'Report submitted', report });
  } catch (error) {
    console.error('Error submitting report:', error.message);
    return res.status(500).json({ message: 'Failed to submit report' });
  }
};

export const listReports = async (_req, res) => {
  try {
    const reports = await Report.findAll({ order: [['reportedAt', 'DESC']] });
    return res.json({ reports });
  } catch (error) {
    console.error('Error fetching reports:', error.message);
    return res.status(500).json({ message: 'Unable to load reports' });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await report.destroy();
    return res.json({ message: 'Report deleted' });
  } catch (error) {
    console.error('Error deleting report:', error.message);
    return res.status(500).json({ message: 'Unable to delete report' });
  }
};
