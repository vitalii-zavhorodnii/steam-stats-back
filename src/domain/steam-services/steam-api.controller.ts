import {
  Controller,
  Query,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';

import { SteamApiService } from './steam-api.service';

@Controller('steam-api')
export class SteamApiController {
  constructor(private steamApiService: SteamApiService) {}

  @Get('/user/:id')
  public async getUserData(@Param('id') id: number) {
    const result = await this.steamApiService.getUserData(id);

    if (!result) throw new NotFoundException();

    return result;
  }

  @Get('/stats/:id')
  public async getUserStats(
    @Query('game') game: string,
    @Param('id') id: string,
  ) {
    const result = await this.steamApiService.getUserStats(id, game);

    if (!result) throw new NotFoundException();

    return result;
  }

  @Get('/friends/:id')
  public async getUserFriends(@Param('id') id: string) {
    const result = await this.steamApiService.getUserFriends(id);

    if (!result) throw new NotFoundException();

    return result;
  }
}
