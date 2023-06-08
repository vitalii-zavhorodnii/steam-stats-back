import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TrnApiModule } from 'domain/trn-api/trn-api.module';
import { ProfilesModule } from './domain/profiles/profiles.module';
import { SteamApiModule } from './domain/steam-api/steam-api.module';

import configuration from 'config/configuration';

@Module({
  imports: [
    TrnApiModule,
    ProfilesModule,
    SteamApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {}
