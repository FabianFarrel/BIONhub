import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Content from './models/Content.js';
import User from './models/User.js';
import { seedContent } from './data/seedData.js';

/**
 * Seed script: wipes the Content collection and inserts the sample dataset.
 * Also creates a demo user so the app can be reviewed without registering.
 * Run with: npm run seed
 */
async function run(): Promise<void> {
  try {
    await connectDB();

    console.log('[seed] Clearing existing content...');
    await Content.deleteMany({});

    console.log(`[seed] Inserting ${seedContent.length} content items...`);
    await Content.insertMany(seedContent);

    const demoEmail = 'demo@bionhub.com';
    await User.deleteOne({ email: demoEmail });
    await User.create({ name: 'Demo User', email: demoEmail, password: 'demo123' });
    console.log('[seed] Demo user ready -> email: demo@bionhub.com  password: demo123');

    console.log('[seed] Done.');
  } catch (err) {
    console.error('[seed] Failed:', (err as Error).message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

void run();
