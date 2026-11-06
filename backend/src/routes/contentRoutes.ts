import { Router } from 'express';
import { listContent, getContent, addReview } from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', listContent);
router.get('/:id', getContent);
router.post('/:id/reviews', protect, addReview);

export default router;
