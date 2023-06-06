import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

import { steamUserMapper } from 'mappers/steamUserMapper';
import { steamLinks } from 'utils/steamLinks';

@Injectable()
export class SteamApiService {
  constructor(private readonly http: HttpService) {}

  async getUserData(id: number): Promise<any> {
    const { STEAM_KEY, GAME_ID_CS } = process.env;
    const { baseURL, steamStats, steamUsers, steamLevel, steamBadges } =
      steamLinks;

    const foundUsers = await firstValueFrom(
      this.http.get(
        `${baseURL}/${steamUsers}/?key=${STEAM_KEY}&appid=${GAME_ID_CS}&steamids=${id}`,
      ),
    );

    const foundPlayer = foundUsers.data.response.players.find(
      ({ steamid }) => steamid === id,
    );

    if (!foundPlayer) return null;

    const foundLevel = await firstValueFrom(
      this.http.get(`${baseURL}/${steamLevel}/?key=${STEAM_KEY}&steamid=${id}`),
    );

    let mappedPlayer = steamUserMapper(foundPlayer);

    const player = {
      ...mappedPlayer,
      level: foundLevel.data.response.player_level,
    };
    return player;
  }
}
