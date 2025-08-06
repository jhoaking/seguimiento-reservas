import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';
@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async create(createReservaDto: CreateReservaDto) {
    const { userId, servicioId, ...rest } = createReservaDto;

    const reservationExists = await this.reservaRepository.find({
      where: {
        user: { id: userId },
        servicio: { id: servicioId },
      },
    });

    if (reservationExists.length > 0) {
      throw new BadRequestException(
        'tienes una reserva pendiente para este servicio',
      );
    }

    const user = await this.reservaRepository.manager.findOne(User, {
      where: { id: userId },
    });

    const service = await this.reservaRepository.manager.findOne(Servicio, {
      where: { id: servicioId },
    });

    if (!user) throw new BadRequestException(`user with ${userId} not found `);

    if (!service)
      throw new BadRequestException(` service with ${servicioId} not found`);

    const reservation = this.reservaRepository.create({
      user,
      servicio: service,
      ...rest,
    });

    await this.reservaRepository.save(reservation);
    return reservation;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const service = await this.reservaRepository.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
        servicio: true,
      },
    });

    return service;
  }

  async findOne(term: string) {
    let reservation: Reserva | null = null;

    if (isUUID(term)) {
      reservation = await this.reservaRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.reservaRepository.createQueryBuilder('reser');
      reservation = await queryBuilder
        .where('nombre =:nombre or fechaReserva =:fechaReserva', {
          nombre: term,
          fechaReserva: term,
        })
        .getOne();
    }

    if (!reservation)
      throw new BadRequestException(`reserva with ${term} not found`);

    return reservation;
  }

  async update(id: string, updateReservaDto: UpdateReservaDto) {
    const { ...toUpdate } = updateReservaDto;

    const reservation = await this.reservaRepository.preload({
      id,
      ...toUpdate,
    });

    if (!reservation)
      throw new NotFoundException(`service with ${id} not found`);

    return this.findOne(id);
  }

  async remove(id: string) {
    const reservation = await this.findOne(id);

    await this.reservaRepository.remove(reservation);
  }

  findAllReservationByUser(user: User) {
    return user;
  }
}
