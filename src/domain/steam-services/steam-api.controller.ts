import { Controller, Param, Get } from '@nestjs/common';

import { SteamApiService } from './steam-api.service';

@Controller('steam-api')
export class SteamApiController {
  constructor(private steamApiService: SteamApiService) {}

  @Get('/user/:id')
  public async getUserData(@Param('id') id: string) {
    const result = await this.steamApiService.getUserData(id);

    return result;
  }

  @Get('/stats/:id')
  public async getUserStats(@Param('id') id: string) {
    const result = await this.steamApiService.getUserStats(id);

    return result;
  }

  @Get('/friends/:id')
  public async getUserFriends(@Param('id') id: string) {
    const result = await this.steamApiService.getUserFriends(id);

    return result;
  }
}
