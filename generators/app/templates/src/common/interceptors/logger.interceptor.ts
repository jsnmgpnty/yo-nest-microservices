import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from '../../logging/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor (private loggerService: LoggerService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const url = req.url;
    const type = req.method;
    const status = res.statusCode;

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          if (url && type && status) this.loggerService.log(`${type} - ${status}: ${url} - ${Date.now() - now}ms`);
        }),
      );
  }
}
