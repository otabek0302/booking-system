import { ApiError as IApiError } from "@types";

// Кастомный класс ошибок API
export class ApiError extends Error implements IApiError {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  // Ошибка 400 - неверный запрос
  static badRequest(message: string = "Bad Request") {
    return new ApiError(400, message);
  }

  // Ошибка 401 - не авторизован
  static unauthorized(message: string = "Unauthorized") {
    return new ApiError(401, message);
  }

  // Ошибка 403 - запрещено
  static forbidden(message: string = "Forbidden") {
    return new ApiError(403, message);
  }

  // Ошибка 404 - не найдено
  static notFound(message: string = "Not Found") {
    return new ApiError(404, message);
  }

  // Ошибка 409 - конфликт
  static conflict(message: string = "Conflict") {
    return new ApiError(409, message);
  }

  // Ошибка 500 - внутренняя ошибка сервера
  static internal(message: string = "Internal Server Error") {
    return new ApiError(500, message);
  }
}
