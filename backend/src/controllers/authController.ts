import type { Request, Response } from 'express';
import User from '../models/User.js';
import { signToken } from '../utils/token.js';

// POST /api/auth/register
export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Name, email and password are required' });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters' });
    return;
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    res.status(409).json({ message: 'An account with this email already exists' });
    return;
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);

  res.status(201).json({ token, user: user.toSafeJSON() });
}

// POST /api/auth/login
export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const token = signToken(user._id);
  res.json({ token, user: user.toSafeJSON() });
}

// GET /api/auth/me  (protected)
export async function getMe(req: Request, res: Response): Promise<void> {
  const user = await User.findById(req.user!._id).populate('favorites');
  res.json({ user });
}
