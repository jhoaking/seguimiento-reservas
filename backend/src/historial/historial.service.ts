import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHistorialDto } from './dto/create-historial.dto';
import { Historial } from './entities/historial.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../auth/entities/auth.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Historial)
    private readonly historialRepository: Repository<Historial>,
  ) {}

  async registrarAccion(createHistorialDto: CreateHistorialDto, user: User) {
    const historial = this.historialRepository.create({
      user,
      ...createHistorialDto,
    });

    await this.historialRepository.save(historial);
    return historial;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const historial = await this.historialRepository.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
      },
    });

    return historial;
  }
}
