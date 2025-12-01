import { Router } from 'express';
import { searchScam, getTrendingScams, getActiveAlerts, addComment } from '../controllers/featureController.js';

const router = Router();

router.get('/lookup', searchScam);
router.get('/trending', getTrendingScams);
router.get('/alerts', getActiveAlerts);
router.post('/reports/:id/comments', addComment);

export default router;
