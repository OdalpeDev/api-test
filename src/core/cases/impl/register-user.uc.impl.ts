/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseHttp } from '../../domain/commons/response-http.model';
import { IregisterUser } from '../register-user.uc';
import { IusersDbDriver } from '../../../drivers/users-db.driver';
import { USER_MESSAGES } from '../../../commons/response-codes/users.messages';
import { CustomException } from '../../../core/domain/commons/custom-exception.model';
import { TuserRegister } from '../../../core/domain/users/user-register';
import { EncriptUtil } from '../../../commons/utils/encrypt.util';


@Injectable()
export class RegisterUser implements IregisterUser {
  constructor(private userDb: IusersDbDriver, private config: ConfigService) {}

  async register(user: TuserRegister): Promise<ResponseHttp> {
    try {
      //Se valida que no exista un usuario con el mismo email
      const validation = await this.userDb.getByEmail(user.email);

      if (validation)
        return new ResponseHttp(
          HttpStatus.BAD_REQUEST,
          USER_MESSAGES.USER_EXIST.code,
          USER_MESSAGES.USER_EXIST.message,
        );

      //Se cifra contraseña
      const key: string = this.config.get<string>('database.key_password');
      const passEncripted: string = EncriptUtil.encrypt(user.password, key);

      //Registro del nuevo usuario en base de datos
      const newUser = await this.userDb.register({
        ...user,
        password: passEncripted,
      });
      return new ResponseHttp(
        HttpStatus.CREATED,
        USER_MESSAGES.REGISTERED.code,
        USER_MESSAGES.REGISTERED.message,
        { user_id: newUser.id },
      );
    } catch (error) {
      throw new CustomException(
        USER_MESSAGES.REGISTRATION_ERROR,
        'uc.registering-user',
        'Technical',
        error,
      );
    }
  }
}
