import { HttpStatus } from '@nestjs/common';
import { GENERAL_ERRORS } from '../../../commons/response-codes/general.error';
import { IcustomException } from './interfaces/custom-exception.interface';
import { IresponseCode } from './interfaces/response-code.interface';

export class CustomException implements IcustomException {
  public readonly code: string;
  public readonly message: string;
  public readonly status?: HttpStatus;
  public details?: any;

  constructor(
    error: IresponseCode = GENERAL_ERRORS.GeneralException,
    public readonly context: string,
    public readonly type: 'Business' | 'Technical' = 'Technical',
    details?: any,
  ) {
    this.code = error?.code;
    this.message = error?.message;
    this.details = details;
  }
}
