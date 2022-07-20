import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import generalConfig from './config/general.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [generalConfig, databaseConfig],
    }),
  ],
  providers: [],
  exports: [],
})
export class CommonsModule {}
