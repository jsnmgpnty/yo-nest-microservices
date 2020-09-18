import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AppException } from '../models';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse().raw;

    response
      .status(exception?.statusCode || 500)
      .send(exception);
  }
}
