import mongoose from 'mongoose';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URI,
  name: process.env.DATABASE_NAME,
  connect: async function connect (uri: string, dbName: string) {
    try {
    await mongoose.connect(uri, { dbName });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    connect(this.url, this.name)
  }
}
}));