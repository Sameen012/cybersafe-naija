import { ScamContent } from '../models/index.js';

export const listContent = async (_req, res) => {
  try {
    const articles = await ScamContent.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ articles });
  } catch (error) {
    console.error('Fetching content failed:', error.message);
    return res.status(500).json({ message: 'Unable to fetch content' });
  }
};

export const createContent = async (req, res) => {
  try {
    const article = await ScamContent.create({ ...req.body, authorId: req.user.id });
    return res.status(201).json({ article });
  } catch (error) {
    console.error('Create content failed:', error.message);
    return res.status(500).json({ message: 'Unable to create content' });
  }
};
