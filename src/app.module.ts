import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SteamApiModule } from './domain/steam-services/steam-api.module';

@Module({
  controllers: [],
  providers: [],
  imports: [SteamApiModule, ConfigModule.forRoot()],
})
export class AppModule {}
