import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateReservaDto {
  @ApiProperty({
    description : 'name of the reservation',
    example : 'reservation for a session of  professional fotographic '
  })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({
    description : 'status of the reservation',
    example : 'pending'
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  estado?: string[];


  @ApiProperty({
    description : 'date for the reservation',
    example : '20205-09-10'
  })
  @IsDateString()
  fechaReserva: string;

  @ApiProperty({
    description : 'when was created the reservation'
  })
   @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({
    description : 'when was updated the reservation'
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;


  @ApiProperty({
    description : 'price of the reservation'
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  precio?: number;

  @ApiProperty({
    description : 'id of user for the reservation',
    example : '0666fbc2-d5e6-4716-8a71-8f7e93824744'
  })
  @IsUUID()
  userId:string

  @ApiProperty({
     description : 'id of service for the reservation',
    example : '0666fbc2-d5e6-4716-8a71-8f7e93824744'
  })
  @IsUUID()
  servicioId:string

}
