import { Router } from 'express';
import { deleteReport, listReports, submitReport } from '../controllers/reportController.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.post('/', submitReport);
router.get('/', requireAdmin, listReports);
router.delete('/:id', requireAdmin, deleteReport);

export default router;
