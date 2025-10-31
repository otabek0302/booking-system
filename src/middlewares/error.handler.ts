import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@utils/api.error';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  console.error('Error:', err);

  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response): Response => {
  return res.status(404).json({
    success: false,
    error: 'Route not found',
  });
};

