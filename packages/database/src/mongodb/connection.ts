/**
 * MongoDB connection utility
 */

import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongoDB(uri: string): Promise<typeof mongoose> {
  if (isConnected) {
    return mongoose;
  }

  try {
    const db = await mongoose.connect(uri, {
      dbName: 'nc-ecommerce',
    });

    isConnected = true;
    console.log('✅ MongoDB connected successfully');
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectMongoDB(): Promise<void> {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
  console.log('MongoDB disconnected');
}

export { mongoose };
