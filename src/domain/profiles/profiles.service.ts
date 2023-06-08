import { Injectable } from '@nestjs/common';
import { SteamApiService } from 'domain/steam-api/steam-api.service';

import { TrnApiService } from 'domain/trn-api/trn-api.service';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly trnApiService: TrnApiService,
    private readonly steamApiService: SteamApiService,
  ) {}

  async getProfileByID(query: string): Promise<any> {
    const steamID = await this.trnApiService.getSteamUserByQuery(query);
    const steamProfile = await this.steamApiService.getProfileById(steamID);
    const trnProfile = await this.trnApiService.getProfileById(steamID);

    console.log({ steamProfile });

    return trnProfile;
  }
}
