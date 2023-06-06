import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import ISteamUser from 'interfaces/ISteamUser';

import { steamUserMapper } from 'mappers/steamUserMapper';
import { steamStatsMapper } from 'mappers/steamStatsMapper';
import { steamLinks } from 'utils/steamLinks';

const { baseURL, steamStats, steamUsers, steamLevel, steamFriends } =
  steamLinks;

@Injectable()
export class SteamApiService {
  constructor(private readonly http: HttpService) {}

  async getUserData(id: number): Promise<ISteamUser> {
    const { STEAM_KEY, GAME_ID_CS } = process.env;

    const foundUsers = await firstValueFrom(
      this.http.get(
        `${baseURL}/${steamUsers}?key=${STEAM_KEY}&appid=${GAME_ID_CS}&steamids=${id}`,
      ),
    );

    const foundPlayer = foundUsers.data.response.players.find(
      ({ steamid }) => steamid === id,
    );

    if (!foundPlayer) return null;

    const foundLevel = await firstValueFrom(
      this.http.get(`${baseURL}/${steamLevel}?key=${STEAM_KEY}&steamid=${id}`),
    );

    let mappedPlayer = steamUserMapper(foundPlayer);

    const player = {
      ...mappedPlayer,
      level: foundLevel.data.response.player_level,
    };
    return player;
  }

  async getUserStats(id: string, game: string) {
    const { STEAM_KEY, GAME_ID_CS } = process.env;

    const foundStats = await firstValueFrom(
      this.http.get(
        `${baseURL}/${steamStats}?key=${STEAM_KEY}&appid=${GAME_ID_CS}&steamid=${id}`,
      ),
    );

    const result = steamStatsMapper(foundStats.data.playerstats.stats);

    return result;
  }

  async getUserFriends(id: string): Promise<ISteamUser[]> {
    const { STEAM_KEY, GAME_ID_CS } = process.env;

    const foundFriendsList = await firstValueFrom(
      this.http.get(
        `${baseURL}/${steamFriends}?key=${STEAM_KEY}&steamid=${id}`,
      ),
    );

    const mappedFriendsList = foundFriendsList.data.friendslist.friends
      .map(({ steamid }) => steamid)
      .join(',');

    const friends = await firstValueFrom(
      this.http.get(
        `${baseURL}/${steamUsers}?key=${STEAM_KEY}&appid=${GAME_ID_CS}&steamids=${mappedFriendsList}`,
      ),
    );

    const mappedFriends = friends.data.response.players.map((player) =>
      steamUserMapper(player),
    );

    return mappedFriends;
  }
}
