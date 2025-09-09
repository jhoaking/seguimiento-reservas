import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Headers,
} from '@nestjs/common';
import { InteraccionesService } from './interacciones.service';
import { CreateInteraccioneDto } from './dto/create-interaccione.dto';
import { Auth } from '../auth/Decorator/auth.decorator';
import { ValidRoles } from '../auth/interface';
import { GetUser } from '../auth/Decorator/get-user.decorator';
import { User } from '../auth/entities/auth.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Interacciones } from './entities/interaccione.entity';

@ApiTags('Interactions')
@Controller('interacciones')
export class InteraccionesController {
  constructor(private readonly interaccionesService: InteraccionesService) {}

  @ApiResponse({ status: 201, type: Interacciones })
  @ApiResponse({ status: 400, description: 'Bad Request', type: Interacciones })
  @ApiResponse({ status: 403, description: 'Forbidden, sender not correct' })
  @Post()
  @Auth(ValidRoles.user, ValidRoles.ia)
  create(
    @Body() createInteraccioneDto: CreateInteraccioneDto,
    @Headers('x-source') source: string,
  ) {
    const fromN8n = source === 'ia';
    return this.interaccionesService.create(createInteraccioneDto, fromN8n);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Not found' })
  @ApiResponse({ status: 403, description: 'Forbidden, token related' })
  @Get(':id')
  @Auth(ValidRoles.admin)
  findAll(@Param('id', ParseUUIDPipe) userId: string) {
    return this.interaccionesService.findInteractionByUser(userId);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Not found' })
  @ApiResponse({ status: 403, description: 'Forbidden, token related' })
  @Get('/user')
  @Auth()
  findAllMessagesOfUser(@GetUser() user: User) {
    return this.interaccionesService.findInteractionByUser(user.id);
  }
}
