import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInteraccioneDto } from './dto/create-interaccione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interacciones } from './entities/interaccione.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/auth.entity';
import { Interaccion } from './types/interacciones';

@Injectable()
export class InteraccionesService {
  constructor(
    @InjectRepository(Interacciones)
    private readonly interaccionesRepository: Repository<Interacciones>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createInteraccioneDto: CreateInteraccioneDto,
  ): Promise<Interacciones> {
    const user = await this.userRepository.findOneBy({
      id: createInteraccioneDto.userId,
    });

    if (!user)
      throw new NotFoundException(
        `user with ${createInteraccioneDto.userId} not found`,
      );

    const ultima = await this.interaccionesRepository.findOne({
      where: { user: { id: createInteraccioneDto.userId } },
      order: { createdAt: 'DESC' },
    });

    if (ultima) {
      if (ultima.remitente === createInteraccioneDto.remitente) {
        throw new BadRequestException(
          `El emisor anterior fue '${ultima.remitente}', se espera alternancia.`,
        );
      }
    } else {
      if (createInteraccioneDto.remitente !== Interaccion.user) {
        throw new BadRequestException(
          'La primera interacción debe ser del cliente.',
        );
      }
    }
    const interaccion = this.interaccionesRepository.create({
      ...createInteraccioneDto,
      user,
    });

    return this.interaccionesRepository.save(interaccion);
  }

  async findAll(user_id: string): Promise<Interacciones[]> {
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw new NotFoundException(' user not found');

    const message = await this.interaccionesRepository.find({
      where: { user: { id: user_id } },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return message;
  }
}
