import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getRequestMainInfo } from '../utils/getRequestMainInfo';

export interface ResponseTransform<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseTransform<T>>
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseTransform<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return next.handle().pipe(
      map((data) => {
        this.logger.info('response', {
          ...getRequestMainInfo(request),
          responseData: data,
        });
        return {
          data,
          code: 0,
          message: 'success',
          success: true,
        };
      }),
    );
  }
}
