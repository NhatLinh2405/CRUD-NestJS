import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before...');

    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    req.body.name = 'this is test name';
    req.body.age = 22;

    return next.handle().pipe(
      map((data) => {
        data = 'from interceptor';
        return data;
      }),
    );
  }
}
