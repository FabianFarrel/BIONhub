import type { IUser } from '../models/User.js';

// Augment Express's Request so controllers can access req.user (set by the protect middleware).
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
