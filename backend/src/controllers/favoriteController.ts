import type { Request, Response } from 'express';
import User from '../models/User.js';
import Content from '../models/Content.js';

// GET /api/favorites  (protected)
export async function listFavorites(req: Request, res: Response): Promise<void> {
  const user = await User.findById(req.user!._id).populate('favorites');
  res.json({ favorites: user?.favorites ?? [] });
}

// POST /api/favorites/:contentId  (protected) - toggle favorite on/off
export async function toggleFavorite(req: Request, res: Response): Promise<void> {
  const { contentId } = req.params;

  const content = await Content.findById(contentId);
  if (!content) {
    res.status(404).json({ message: 'Content not found' });
    return;
  }

  const user = await User.findById(req.user!._id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const index = user.favorites.findIndex((f) => f.toString() === contentId);

  let favorited: boolean;
  if (index >= 0) {
    user.favorites.splice(index, 1);
    favorited = false;
  } else {
    user.favorites.push(content._id as typeof user.favorites[number]);
    favorited = true;
  }

  await user.save();
  res.json({ favorited, favorites: user.favorites });
}
