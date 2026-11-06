import "dotenv/config";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

/**
 * Vercel serverless entry point.
 *
 * Every request first ensures a (cached) MongoDB connection, then hands off
 * to the Express app. We intentionally do NOT call app.listen() here — Vercel
 * invokes this handler per request instead of running a long-lived server.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();
  } catch {
    res.status(503).json({ message: "Database connection failed" });
    return;
  }
  // The Express app is itself a (req, res) request listener.
  return app(req as any, res as any);
}
