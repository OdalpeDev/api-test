import { Iuser } from './user.interface';

export type TuserRegister = Omit<Iuser, 'id' | 'enabled'>;
