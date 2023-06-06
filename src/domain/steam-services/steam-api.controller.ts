import { Controller, Param, Get, NotFoundException } from '@nestjs/common';

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
}
