import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  user?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

