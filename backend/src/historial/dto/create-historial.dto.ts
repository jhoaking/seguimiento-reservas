import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TipoAccion } from '../types/historial.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistorialDto {
  @ApiProperty({
    description: 'action for the record of the reservation',
    enum: TipoAccion,
    example: TipoAccion.crear_reserva,
  })
  @IsEnum(TipoAccion)
  accion: TipoAccion;

  @ApiProperty({
    description: 'description of the reservation for the record',
    example: 'the user made a reservation of a travel to california',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    description: 'entity as service',
    example: 'reservation',
  })
  @IsOptional()
  @IsString()
  entidadReferida?: string;

  @ApiProperty({
    description: 'id of the entity referenced ',
    example: 'b308243b-2cb6-46ba-87cf-264571525c3d',
  })
  @IsOptional()
  @IsUUID()
  idEntidad?: string;
}
