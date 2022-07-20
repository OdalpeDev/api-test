import { ResponseBase } from './response-base.model';

export class ResponseHttp<T = any> extends ResponseBase<T> {
  constructor(
    public status: number,
    code?: string,
    message?: string,
    data?: T,
  ) {
    super(code, message, data);
  }
}
