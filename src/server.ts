import 'reflect-metadata';
import app from './app';
import { initializeDatabase } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

