export interface ImetaResponse {
  readonly trace_id: string;
}

export interface IresponseBase<T = any> {
  code: string;
  message: string;
  meta: ImetaResponse;
  data?: T;
}
