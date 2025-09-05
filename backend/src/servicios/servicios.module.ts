import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicio } from './entities/servicio.entity';

@Module({
  controllers: [ServiciosController],
  providers: [ServiciosService],
  imports : [TypeOrmModule.forFeature([Servicio]),PassportModule],
  exports : [TypeOrmModule,ServiciosService]
})
export class ServiciosModule {}
