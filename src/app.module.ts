import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SteamApiModule } from './domain/steam-services/steam-api.module';

import configuration from 'config/configuration';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SteamApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {}
