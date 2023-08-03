import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { BusinessException } from './business.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getRequestMainInfo } from '../utils/getRequestMainInfo';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (request.originalUrl === '/favicon.ico') {
      return;
    }

    // 处理业务异常
    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      this.logger.error('business exception', {
        status,
        code: error['code'],
        errorMessage: error['message'],
        ...getRequestMainInfo(request),
      });
      response.status(HttpStatus.OK).send({
        data: null,
        status,
        code: error['code'],
        message: error['message'],
        success: false,
      });
      return;
    }

    this.logger.error('http exception filter', {
      status,
      code: status,
      errorMessage: exception.message,
      ...getRequestMainInfo(request),
    });

    const errReason = exception.getResponse();

    response.status(status).send({
      status,
      code: status,
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof errReason === 'string'
          ? errReason
          : errReason.hasOwnProperty('message')
          ? Reflect.get(errReason, 'message')
          : '',
    });
  }
}
