import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import dayjs from '@utils/day';

export interface Response<T> {
  code: number;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const { statusCode } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        timestamp: dayjs().format(),
        code: statusCode,
        data,
      })),
    );
  }
}
