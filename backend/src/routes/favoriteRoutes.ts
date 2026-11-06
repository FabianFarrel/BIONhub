import { Router } from 'express';
import { listFavorites, toggleFavorite } from '../controllers/favoriteController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, listFavorites);
router.post('/:contentId', protect, toggleFavorite);

export default router;
