import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { CoreModule } from './core/core.module';
import { DriversModule } from './drivers/drivers.module';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [AdaptersModule, CoreModule, DriversModule, CommonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
