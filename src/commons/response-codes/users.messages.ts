import { IresponseCode } from '../../core/domain/commons/interfaces/response-code.interface';

type TuserMessages = 'REGISTERED' | 'USER_EXIST' | 'REGISTRATION_ERROR';

export const USER_MESSAGES: Record<TuserMessages, IresponseCode> = {
  REGISTERED: {
    code: 'OK',
    message: 'Usuario registrado correctamente!.',
  },
  USER_EXIST: {
    code: 'BE_USR_001',
    message:
      'Ya existe un usuario registrado en el sistema con el email indicado',
  },
  REGISTRATION_ERROR: {
    code: 'TE_USR_001',
    message: 'No fue posible registrar la información.',
  },
};
