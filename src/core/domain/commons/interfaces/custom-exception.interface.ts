import { HttpStatus } from '@nestjs/common';
import { IresponseCode } from './response-code.interface';

export interface IcustomException extends IresponseCode {
  readonly context: string;
  readonly type: 'Business' | 'Technical';
  readonly details?: any;
  readonly status?: HttpStatus;
}
