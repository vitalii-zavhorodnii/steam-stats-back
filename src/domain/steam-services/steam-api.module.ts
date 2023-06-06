import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SteamApiController } from './steam-api.controller';
import { SteamApiService } from './steam-api.service';

@Module({
  controllers: [SteamApiController],
  providers: [SteamApiService],
  imports: [HttpModule],
})
export class SteamApiModule {}
