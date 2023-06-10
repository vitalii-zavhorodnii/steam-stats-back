import { Injectable } from '@nestjs/common';
import { SteamApiService } from 'domain/steam-api/steam-api.service';

import { TrnApiService } from 'domain/trn-api/trn-api.service';

import { weaponStatsMapper } from 'mappers/weaponStatsMapper';
import { profileDataConcat } from 'mappers/profileDataConcat';

import IProfileData from 'interfaces/IProfileData';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly trnApiService: TrnApiService,
    private readonly steamApiService: SteamApiService,
  ) {}

  async getProfileByID(query: string): Promise<any> {
    const steamID = await this.trnApiService.getSteamUserByQuery(query);
    const steamProfile = await this.steamApiService.getProfileById(steamID);
    const { data: weaponProfile } = await this.trnApiService.getStatsBySegment(
      steamID,
      'weapon',
    );

    const concatedProfile = profileDataConcat(steamProfile);
    const weaponStats = weaponStatsMapper(weaponProfile);

    return { ...concatedProfile, stats: { weapon: [...weaponStats] } };
  }
}