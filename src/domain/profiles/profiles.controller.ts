import { Controller, Query, Get } from '@nestjs/common';

import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @Get('/search')
  public async getUserData(@Query('query') query: string) {
    const result = await this.profileService.getProfileByID(query);

    return result;
  }
}
