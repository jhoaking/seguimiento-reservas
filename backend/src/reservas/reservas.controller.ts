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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Auth } from '../auth/Decorator/auth.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ValidRoles } from '../auth/interface';
import { GetUser } from '../auth/Decorator/get-user.decorator';
import { User } from '../auth/entities/auth.entity';
import { Reserva } from './entities/reserva.entity';

@ApiTags('reservations')
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @ApiResponse({status: 201,description: 'services was succefull executed',type: Reserva,})
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'forbiden token related' })
  @Post()
  @Auth()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @ApiResponse({status : 200 , description : 'services was succefull executed'})
  @ApiResponse({status : 403 , description : 'forbiden token related or role' })
  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reservasService.findAll(paginationDto);
  }

  @ApiResponse({status : 201 , description : 'services was succefull executed'})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 400 , description : 'Not Found' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Get('/user')
  @Auth()
  findAllReservationsOfUser(@GetUser() user: User) {
    return this.reservasService.findAllReservationByUser(user);
  }

  @ApiResponse({status : 201 , description : 'services was succefull executed'})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.reservasService.findOne(term);
  }

    @ApiResponse({status : 201 , description : 'services was succefull updated'})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 400 , description : 'Not Found' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservaDto: UpdateReservaDto,
    @GetUser() user: User,
  ) {
    return this.reservasService.update(id, updateReservaDto, user);
  }

  @ApiResponse({status : 201 , description : 'services was succefull deleted'})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 400 , description : 'Not Found' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.reservasService.remove(id, user);
  }
}
