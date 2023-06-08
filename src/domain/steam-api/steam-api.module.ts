import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { SteamApiService } from './steam-api.service';

@Module({
  providers: [SteamApiService],
  exports: [SteamApiService],
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('steamapi.baseUrl'),
        params: {
          key: configService.get<string>('steamapi.key'),
        },
        timeout: 7000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SteamApiModule {}
