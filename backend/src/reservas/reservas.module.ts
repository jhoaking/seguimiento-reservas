import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { Reserva } from './entities/reserva.entity';
import { HistorialModule } from '../historial/historial.module';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService],
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    PassportModule,
    HistorialModule,
  ],
  exports: [TypeOrmModule, ReservasService],
})
export class ReservasModule {}
