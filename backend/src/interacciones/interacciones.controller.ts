import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InteraccionesService } from './interacciones.service';
import { CreateInteraccioneDto } from './dto/create-interaccione.dto';
import { Auth } from 'src/auth/Decorator/auth.decorator';
import { ValidRoles } from 'src/auth/interface';


@Controller('interacciones')
export class InteraccionesController {
  constructor(private readonly interaccionesService: InteraccionesService) {}

  @Post()
  create(@Body() createInteraccioneDto: CreateInteraccioneDto) {
    return this.interaccionesService.create(createInteraccioneDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.interaccionesService.findAll(userId);
  }
}
