import { Router } from 'express';
import { createScam, getScams } from '../controllers/scamController.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/', getScams);
router.post('/', requireAdmin, createScam);

export default router;
