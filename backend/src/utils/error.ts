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
