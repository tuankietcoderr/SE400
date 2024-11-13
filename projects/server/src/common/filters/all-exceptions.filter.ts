import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseResponse, ErrorResponse } from '../response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    console.log({ exception });
    this.logger.error(exception);

    const responseBody = new ErrorResponse(exception.message).setStatusCode(
      exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR
    );

    if (exception instanceof BadRequestException && exception.stack?.includes('ValidationPipe')) {
      const response = exception.getResponse() as any;
      responseBody.setMessage(response.message?.join(', ')).setStatusCode(HttpStatus.BAD_REQUEST);
    } else if (exception instanceof HttpException) {
      responseBody.setStatusCode(exception.getStatus());
    } else if (exception instanceof BaseResponse) {
      responseBody.setStatusCode(exception.statusCode);
      responseBody.setMessage(exception.message);
    }

    responseBody.setStackTrace(exception.stack).setExceptionName(exception.name);

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
