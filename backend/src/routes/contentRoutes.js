import { Router } from 'express';
import { createContent, listContent } from '../controllers/contentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listContent);
router.post('/', authenticate, requireAdmin, createContent);

export default router;
