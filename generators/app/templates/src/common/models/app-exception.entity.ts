import { HttpException, ArgumentsHost } from "@nestjs/common";
import { ErrorInfo } from "./error-info.entity";

export class AppException extends HttpException {
  error: ErrorInfo;

  constructor (error: ErrorInfo) {
    super(error.type, error.statusCode);
    this.message = error.message;
  }
}
