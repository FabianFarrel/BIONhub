import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas using the connection string in MONGODB_URI.
 * Throws if the connection cannot be established, because the API is
 * useless without the database.
 */
export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and fill it in.');
  }

  mongoose.set('strictQuery', true);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.error('[db] MongoDB connection error:', (err as Error).message);
    throw err;
  }
}
