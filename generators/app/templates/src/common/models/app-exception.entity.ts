import { ErrorInfo } from "./error-info.entity";

export class AppException extends Error {
  error: ErrorInfo;

  constructor (error: ErrorInfo) {
    super(error.type);
    this.error = error;
    this.message = error.message;
  }
}
