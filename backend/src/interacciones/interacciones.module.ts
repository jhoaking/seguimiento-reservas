import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InteraccionesService } from './interacciones.service';
import { InteraccionesController } from './interacciones.controller';
import { Interacciones } from './entities/interaccione.entity';

@Module({
  controllers: [InteraccionesController],
  providers: [InteraccionesService],
  imports: [TypeOrmModule.forFeature([Interacciones])],
})
export class InteraccionesModule {}
