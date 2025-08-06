import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Interaccion } from "../types/interacciones";
import { User } from "src/auth/entities/auth.entity";


@Entity({name : 'interacciones'})
export class Interacciones {

    @PrimaryGeneratedColumn('uuid')
     id:string;

     @Column('enum',{
        enum : Interaccion
     })
     remitente : Interaccion

     @Column('text')
     contenido : string

     @CreateDateColumn()
     createdAt : Date

     @ManyToOne(
        () => User,
        (user) => user.message,
        {onDelete : 'CASCADE'}
     )
     user:User
}
