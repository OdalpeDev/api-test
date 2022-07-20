import { Module } from '@nestjs/common';
import { DriversModule } from 'src/drivers/drivers.module';
import { RegisterUser } from './cases/impl/register-user.uc.impl';
import { IregisterUser } from './cases/register-user.uc';

@Module({
  imports: [DriversModule],
  providers: [{ provide: IregisterUser, useClass: RegisterUser }],
  exports: [IregisterUser],
})
export class CoreModule {}
