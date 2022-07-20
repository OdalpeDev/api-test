import { IresponseCode } from '../../core/domain/commons/interfaces/response-code.interface';

type TgeneralErrors = 'GeneralException' | '400' | '404' | '500';

export const GENERAL_ERRORS: Record<TgeneralErrors, IresponseCode> = {
  GeneralException: {
    code: 'EXC_001',
    message: 'Disculpas :), Se nos presentó un error procesando su solicitud.',
  },
  500: {
    code: 'EXC_500',
    message: 'Disculpas :), Se nos presentó un error procesando su solicitud.',
  },
  404: {
    code: 'EXC_404',
    message: 'No se encontró el recurso solicitado.',
  },
  400: {
    code: 'EXC_400',
    message: 'Datos de solicitud incorrectos.',
  },
};
