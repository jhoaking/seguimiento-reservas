import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Status } from '../types/types.reservation';

export class CreateReservaDto {
  @ApiProperty({
    description: 'name of the reservation',
    example: 'reservation for a session of  professional fotographic ',
  })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({
    description: 'Status of the reservation',
    enum: Status,
    example: Status.pending,
  })
  @IsOptional()
  @IsEnum(Status)
  estado?: Status;

  @ApiProperty({
    description: 'date for the reservation',
    example: '2025-09-10',
  })
  @IsDateString()
  fechaReserva: string;

  @ApiProperty({
    description: 'price of the reservation',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  precio?: number;

  @ApiProperty({
    description: 'id of user for the reservation',
    example: '0666fbc2-d5e6-4716-8a71-8f7e93824744',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'id of service for the reservation',
    example: '0666fbc2-d5e6-4716-8a71-8f7e93824744',
  })
  @IsUUID()
  servicioId: string;
}
