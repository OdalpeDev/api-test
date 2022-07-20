import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersDbDriver } from './impl/user-db.driver.impl';
import { Users, Userschema } from './schemas/users.schema';
import { IusersDbDriver } from './users-db.driver';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongo_uri'),
        retryAttempts: 3,
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: Userschema,
        collection: 'coll_users',
      },
    ]),
  ],
  providers: [{ provide: IusersDbDriver, useClass: UsersDbDriver }],
  exports: [IusersDbDriver],
})
export class DriversModule {}
