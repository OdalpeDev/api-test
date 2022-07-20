import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ResponseHttp } from 'src/core/domain/commons/response-http.model';
import { IresponseBase } from '../../core/domain/commons/interfaces/response-base.interface';
import { GeneralUtils } from './general.util';

@Injectable()
export class RequestHttpInterceptor implements NestInterceptor<IresponseBase> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IresponseBase> {
    const req = context.switchToHttp().getRequest();
    const { headers, method, url, params, query, body } = req;

    //Inicia traza
    const trace_id = GeneralUtils.getTraceId;
    console.log(
      `Start execution with trace_id <<${trace_id}>>`,
      JSON.stringify({ headers, method, url, params, query, body }),
    );

    return next.handle().pipe(
      tap((_result: ResponseHttp) => {
        const { status, code, message } = _result;

        context.switchToHttp().getResponse().status(status);

        console.log(`Execution finished for trace_id <<${trace_id}>>`, {
          status,
          code,
          message,
        });
      }),
    );
  }
}
