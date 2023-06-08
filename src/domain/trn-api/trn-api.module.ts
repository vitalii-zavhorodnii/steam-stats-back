import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { TrnApiService } from './trn-api.service';

@Module({
  providers: [TrnApiService],
  exports: [TrnApiService],
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('trnapi.baseUrl'),
        headers: {
          [configService.get<string>('trnapi.headerKey')]:
            configService.get<string>('trnapi.headerValue'),
        },
        timeout: 7000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TrnApiModule {}
