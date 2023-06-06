import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { SteamApiController } from './steam-api.controller';
import { SteamApiService } from './steam-api.service';

@Module({
  controllers: [SteamApiController],
  providers: [SteamApiService],
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('steamservice.baseUrl'),
        params: {
          key: configService.get<string>('steamservice.key'),
          appid: configService.get<string>('steamservice.gamekeys.csgo'),
          timeout: 3000,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SteamApiModule {}
