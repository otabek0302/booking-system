import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@utils/index';
import { env } from '@config/index';

// Глобальный обработчик ошибок
export const errorHandler = (err: Error | ApiError,_req: Request,res: Response,_next: NextFunction): Response => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  console.error("Error:", err);

  return res.status(statusCode).json({
    success: false,
    message: message,
    ...(env.nodeEnv === "development" && { stack: err.stack }),
  });
};

// Обработчик для несуществующих маршрутов
export const notFoundHandler = (req: Request, res: Response): Response => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

