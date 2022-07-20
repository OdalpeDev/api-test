import { GeneralUtils } from '../../../commons/utils/general.util';
import {
  ImetaResponse,
  IresponseBase,
} from './interfaces/response-base.interface';

export class ResponseBase<T = any> implements IresponseBase<T> {
  public meta: ImetaResponse;
  public code: string;
  public message: string;
  public data?: T;

  constructor(code?: string, message?: string, data?: T) {
    this.meta = {
      trace_id: GeneralUtils.getTraceId,
    };
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
