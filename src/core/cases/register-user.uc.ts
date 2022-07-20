import { Injectable } from '@nestjs/common';
import { ResponseHttp } from '../domain/commons/response-http.model';
import { TuserRegister } from '../domain/users/user-register';

@Injectable()
export abstract class IregisterUser {
  /**
   * Registra un nuevo usuario en el sistema
   * @param user datos del usuario
   */
  abstract register(user: TuserRegister): Promise<ResponseHttp>;
}
