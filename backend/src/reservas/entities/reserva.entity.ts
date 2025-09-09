import { User } from 'src/auth/entities/auth.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../types/types.reservation';

@Entity({ name: 'reservas' })
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column({
    enum: Status,
  })
  estado: Status;

  @Column('timestamp')
  fechaReserva: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('float', {
    nullable: true,
  })
  precio: number;

  @ManyToOne(() => User, (user) => user.reservas, { eager: true })
  user: User;

  @ManyToOne(() => Servicio, (servicio) => servicio.reserva, { eager: true })
  servicio: Servicio;
}
