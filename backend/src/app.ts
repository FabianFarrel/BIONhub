import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// --- Security & parsing middleware ---
app.use(helmet());

const origins = (process.env.CLIENT_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: origins.length ? origins : true, // allow listed origins, or all in dev
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Basic rate limiting to blunt brute-force / abuse.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'bionhub-backend', time: new Date().toISOString() });
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/favorites', favoriteRoutes);

// --- 404 + error handling ---
app.use(notFound);
app.use(errorHandler);

export default app;
