import 'reflect-metadata';
import app from './app';
import { initializeDatabase } from './database/database';
import { env } from '@config/env.config';

// Запуск сервера
const startServer = async (): Promise<void> => {
  try {
    // Инициализация подключения к базе данных
    await initializeDatabase();

    // Запуск сервера
    app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port}`);
      console.log(`Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

