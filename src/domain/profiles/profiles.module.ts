import { Module } from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';

import { TrnApiModule } from 'domain/trn-api/trn-api.module';
import { SteamApiModule } from 'domain/steam-api/steam-api.module';

import { TrnApiService } from 'domain/trn-api/trn-api.service';
import { SteamApiService } from 'domain/steam-api/steam-api.service';

@Module({
  imports: [SteamApiModule, TrnApiModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
