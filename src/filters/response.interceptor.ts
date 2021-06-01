import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import dayjs from '@utils/day';

export interface Response {
  code: number;
  data: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => ({
        timestamp: dayjs().format(),
        code: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    );
  }
}
