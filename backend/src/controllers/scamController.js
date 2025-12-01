import { Scam } from '../models/index.js';

export const getScams = async (_req, res) => {
  try {
    const scams = await Scam.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ scams });
  } catch (error) {
    console.error('Error fetching scams:', error.message);
    return res.status(500).json({ message: 'Unable to load scams' });
  }
};

export const createScam = async (req, res) => {
  try {
    const { title, description, redFlags, preventionTips, category } = req.body;

    if (!title || !description || !preventionTips || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const scam = await Scam.create({
      title,
      description,
      redFlags: redFlags ?? [],
      preventionTips,
      category
    });

    return res.status(201).json({ scam });
  } catch (error) {
    console.error('Error creating scam:', error.message);
    return res.status(500).json({ message: 'Unable to create scam entry' });
  }
};
