import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';
import Content, { type IContent } from '../models/Content.js';

// Utility: escape user input used to build a RegExp.
function escapeRegex(str: string): string {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// GET /api/content?type=movie&search=...&genre=...&sort=rating
export async function listContent(req: Request, res: Response): Promise<void> {
  const { type, search, genre, sort } = req.query as {
    type?: string;
    search?: string;
    genre?: string;
    sort?: string;
  };

  const filter: FilterQuery<IContent> = {};

  if (type && ['movie', 'tv', 'music'].includes(type)) {
    filter.type = type as IContent['type'];
  }
  if (genre) {
    filter.genres = { $in: [new RegExp(`^${escapeRegex(genre)}$`, 'i')] };
  }
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ title: rx }, { creator: rx }, { overview: rx }];
  }

  let query = Content.find(filter).select('-reviews');

  if (sort === 'rating') query = query.sort({ averageRating: -1 });
  else if (sort === 'year') query = query.sort({ releaseYear: -1 });
  else query = query.sort({ createdAt: -1 });

  const items = await query.exec();
  res.json({ count: items.length, items });
}

// GET /api/content/:id  (public, includes reviews)
export async function getContent(req: Request, res: Response): Promise<void> {
  const item = await Content.findById(req.params.id);
  if (!item) {
    res.status(404).json({ message: 'Content not found' });
    return;
  }
  res.json({ item });
}

// POST /api/content/:id/reviews  (protected)
export async function addReview(req: Request, res: Response): Promise<void> {
  const { rating, comment } = req.body as { rating?: number | string; comment?: string };
  const numericRating = Number(rating);

  if (!numericRating || numericRating < 1 || numericRating > 10) {
    res.status(400).json({ message: 'Rating must be a number between 1 and 10' });
    return;
  }

  const item = await Content.findById(req.params.id);
  if (!item) {
    res.status(404).json({ message: 'Content not found' });
    return;
  }

  const userId = req.user!._id;
  const existing = item.reviews.find((r) => r.user.toString() === userId.toString());
  if (existing) {
    existing.rating = numericRating;
    existing.comment = comment || '';
  } else {
    item.reviews.push({
      user: userId,
      userName: req.user!.name,
      rating: numericRating,
      comment: comment || '',
    });
  }

  item.recalculateRating();
  await item.save();
  res.status(201).json({ item });
}
