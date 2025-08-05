import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'servicios' })
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('int', {
    default: 0,
  })
  duration: number;

  @Column('bool', {
    default: true,
  })
  activo: boolean;


  @OneToMany(
    () => Reserva,
    (reserva) =>reserva.servicio,
    {eager :true} 
  )
  reserva:Reserva[]
}
