import type { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response): void {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  const current = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;
  console.error('[error]', err.message);
  res.status(current).json({
    message: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
}
