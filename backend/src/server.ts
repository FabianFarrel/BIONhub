import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = Number(process.env.PORT) || 5000;

async function start(): Promise<void> {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[server] BIONhub API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[server] Failed to start:', (err as Error).message);
    process.exit(1);
  }
}

void start();
