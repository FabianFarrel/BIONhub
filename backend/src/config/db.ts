import mongoose from "mongoose";

/**
 * Cached connection promise. In serverless environments (e.g. Vercel) the
 * module may be re-used across invocations, so we keep a single in-flight /
 * resolved connection instead of dialing MongoDB on every request.
 */
let cached: Promise<typeof mongoose> | null = null;

/**
 * Connect to MongoDB Atlas using the connection string in MONGODB_URI.
 * Throws if the connection cannot be established, because the API is
 * useless without the database. Safe to call on every request: the first
 * call connects, later calls reuse the cached connection.
 */
export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env and fill it in.",
    );
  }

  // Already connected / connecting: reuse it.
  if (cached) return cached;

  mongoose.set("strictQuery", true);

  cached = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 15000,
    })
    .then((conn) => {
      console.log(
        `[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`,
      );
      return conn;
    })
    .catch((err) => {
      console.error("[db] MongoDB connection error:", (err as Error).message);
      cached = null; // allow a retry on the next request
      throw err;
    });

  return cached;
}
