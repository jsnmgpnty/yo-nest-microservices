import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestSanitizerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse().raw;
    if (!request || !request.raw || !response) return next.handle();
    const type = request.raw.method;
    if (type.toLowerCase() === 'post' && request.body && typeof request.body === 'string') {
      request.body = JSON.parse(request.body);
    }
    return next.handle();
  }
}
