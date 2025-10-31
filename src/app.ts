import { Application, Request, Response } from 'express';
import { errorHandler, notFoundHandler } from '@middlewares/error.handler';

import express from 'express';
import routes from '@routes/index';
import cors from 'cors';

const app: Application = express();

// Middlewares - CORS, парсинг JSON и URL-encoded данных
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршруты API
app.use('/api/v1', routes);

// Проверка работоспособности сервера
app.get('/health', (_req: Request, res: Response): Response => {
  return res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Обработчики ошибок
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

