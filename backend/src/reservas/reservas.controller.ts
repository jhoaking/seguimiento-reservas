import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Auth } from 'src/auth/Decorator/auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @Auth()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reservasService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.reservasService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservasService.remove(id);
  }
}
