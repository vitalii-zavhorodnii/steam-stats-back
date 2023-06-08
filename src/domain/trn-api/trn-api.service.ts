import {
  Injectable,
  NotFoundException,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class TrnApiService {
  constructor(private readonly http: HttpService) {}

  async getSteamUserByQuery(query: string) {
    console.log({ query });
    const {
      data: { data: steamUsers },
    } = await firstValueFrom(
      this.http.get(`/csgo/standard/search?platform=steam&query=${query}`).pipe(
        catchError((error) => {
          console.error(error);
          const { data, status } = error.response;

          throw new BadRequestException(data, status);
        }),
      ),
    );

    if (steamUsers.length === 0)
      throw new NotFoundException('No players was found');

    return steamUsers[0].platformUserIdentifier;
  }

  async getProfileById(id: string): Promise<any> {
    const {
      data: { data: player },
    } = await firstValueFrom(
      this.http.get(`/csgo/standard/profile/steam/${id}`).pipe(
        catchError((e) => {
          throw new BadRequestException(e.response.data, e.response.status);
        }),
      ),
    );

    if (!player) throw new NotFoundException('Player was not found');

    return player;
  }
}
