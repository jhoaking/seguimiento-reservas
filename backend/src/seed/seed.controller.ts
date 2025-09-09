import {
  Controller,
  Get,
} from '@nestjs/common';

import { SeedService } from './seed.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiResponse({status : 200 , description : 'SEED EXECUTED'})
  @Get()
  executedSeed() {
    return this.seedService.runSeed();
  }
}
