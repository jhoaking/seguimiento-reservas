import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { Auth } from '../auth/Decorator/auth.decorator';
import { ValidRoles } from '../auth/interface';
import { PaginationDto } from '../common/dto/pagination.dto';
import { GetUser } from '../auth/Decorator/get-user.decorator';
import { User } from '../auth/entities/auth.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Historial } from './entities/historial.entity';

@ApiTags('historial')
@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}


  @ApiResponse({status : 201 , type : Historial})
  @ApiResponse({status  :403 , description : 'forbidden token related'})
  @ApiResponse({status : 400 , description : 'Bad Request' , type : Historial})
  @Post()
  @Auth(ValidRoles.admin)
  create(
    @Body() createHistorialDto: CreateHistorialDto,
    @GetUser() user:User
  ) {
    return this.historialService.registrarAccion(createHistorialDto,user);
  }

  @ApiResponse({status : 200 , description : 'historial was succesfull executed'})
  @ApiResponse({status  :403 , description : 'forbidden token related'})
  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto : PaginationDto) {
    return this.historialService.findAll(paginationDto);
  }

  
}
