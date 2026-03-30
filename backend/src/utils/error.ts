export class AppError extends Error {
  name: string;
  statusCode: number;
  message: string;

  constructor(name: string, statusCode: number, message: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super("NotFound", 404, message);
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super("AuthError", 400, message);
  }
}
