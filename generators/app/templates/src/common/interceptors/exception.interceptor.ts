import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../../logging/logger.service';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest().raw;
    const response = ctx.getResponse().raw;
    if (!request || !response) return next.handle();

    const status = response.statusCode;
    const url = request.url;
    const method = request.method;

    return next
      .handle()
      .pipe(
        catchError(err => {
          this.loggerService.error(
            `Error encountered when hitting ${method} - ${url} - status: ${status} - timestamp: ${new Date().toISOString()}`,
            err
          );
          const { response } = err;
          return throwError(
            new HttpException(
              response,
              HttpStatus.BAD_REQUEST,
            ),
          );
        }),
      );
  }
}