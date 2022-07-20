import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from '../../core/domain/commons/custom-exception.model';
import { ResponseHttp } from '../../core/domain/commons/response-http.model';
import { GENERAL_ERRORS } from '../response-codes/general.error';
import { GeneralUtils } from './general.util';

@Catch()
export class ExceptionManager implements ExceptionFilter {
  // ...
  async catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const trace_id = GeneralUtils.getTraceId;

    console.log(`General exception for trace_id <<${trace_id}>>`, exception);

    const result: ResponseHttp = new ResponseHttp(
      HttpStatus.INTERNAL_SERVER_ERROR,
      GENERAL_ERRORS.GeneralException.code,
      GENERAL_ERRORS.GeneralException.message,
    );

    if (exception instanceof CustomException) {
      result.code = exception.code;
      result.message = exception.message;
      result.data = exception?.details;
    }

    if (exception instanceof HttpException) {
      if (exception.getStatus() != 500) {
        result.status = exception.getStatus();
        result.code = GENERAL_ERRORS[result.status].code ?? result.code;
        result.message =
          GENERAL_ERRORS[result.status].message ?? result.message;
        result.data = exception.getResponse()['message'];
      }
    }

    console.log(
      `Execution finished with exception for trace_id <<${trace_id}>>`,
      {
        status: result.status,
        code: result.code,
        message: result.message,
      },
    );

    response.status(result.status).json(result);
  }
}
