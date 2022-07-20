import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionManager } from '../commons/utils/exceptions-manager.filter';
import { RequestHttpInterceptor } from '../commons/utils/request-http.interceptor';
import { CoreModule } from '../core/core.module';
import { UsersController } from './http/users.controller';

@Module({
  imports: [CoreModule],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionManager,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestHttpInterceptor,
    },
  ],
})
export class AdaptersModule {}
