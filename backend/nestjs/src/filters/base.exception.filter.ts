import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ServiceUnavailableException,
  HttpException,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getRequestMainInfo } from '../utils/getRequestMainInfo';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorResponse = new ServiceUnavailableException().getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : typeof errorResponse === 'object'
        ? Reflect.get(errorResponse, 'statusCode') ||
          HttpStatus.SERVICE_UNAVAILABLE
        : HttpStatus.SERVICE_UNAVAILABLE;
    const errorMessage = exception.message
      ? exception.message
      : typeof errorResponse === 'object'
      ? Reflect.get(errorResponse, 'message') || 'Service Error'
      : status >= 500
      ? 'Service Error'
      : 'Client Error';

    this.logger.error('base exception filter', {
      status,
      errorMessage,
      ...getRequestMainInfo(request),
    });

    // 非 HTTP 标准异常处理。
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      status,
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
      success: false,
      data: null,
    });
  }
}
