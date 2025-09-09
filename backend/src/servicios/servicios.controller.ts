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

import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/Decorator/auth.decorator';
import { ValidRoles } from '../auth/interface';
import { Servicio } from './entities/servicio.entity';


@ApiTags('Servicios')
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}


  @ApiResponse({status : 201 , description : 'services was succefull executed' , type : Servicio})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @ApiResponse({status : 200 , description : 'services was succefull executed'})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.serviciosService.findAll(paginationDto);
  }

  
  @ApiResponse({status : 200 , description : 'services was succefull executed'})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.serviciosService.findOne(term);
  }


  @ApiResponse({status : 200 , description : 'services was succefull updated'})
  @ApiResponse({status : 400 , description : 'Bad request' })
  @ApiResponse({status : 400 , description : 'not found' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServicioDto: UpdateServicioDto,
  ) { 
    return this.serviciosService.update(id, updateServicioDto);
  }

  @ApiResponse({status : 200 , description : 'services was succefull deleted'})
  @ApiResponse({status : 400 , description : 'not found' })
  @ApiResponse({status : 403 , description : 'forbiden token related' })
  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviciosService.remove(id);
  }
}
