import type { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { verifyToken } from '../utils/token.js';

/**
 * Protect middleware: requires a valid "Authorization: Bearer <token>" header.
 * Attaches the authenticated user to req.user.
 */
export async function protect(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Not authorized, no token provided' });
      return;
    }
    const token = header.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
}
