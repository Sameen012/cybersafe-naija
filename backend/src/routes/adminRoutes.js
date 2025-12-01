import { Router } from 'express';
import { dashboardStats } from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/stats', authenticate, requireAdmin, dashboardStats);

export default router;
