import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';


import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
import { Historial } from './entities/historial.entity';

@Module({
  controllers: [HistorialController],
  providers: [HistorialService],
  imports: [TypeOrmModule.forFeature([Historial]),PassportModule],
  exports: [TypeOrmModule, HistorialService],
})
export class HistorialModule {}
