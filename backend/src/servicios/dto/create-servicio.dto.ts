import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateServicioDto {

  @ApiProperty({
    description : 'name of the service',
    example : 'travels'
  })
  @IsString()
  @MinLength(1)
  name: string; 

  @ApiProperty({
    description : 'description of the service',
    example : 'travels around the world'
  })
  @IsString()
  @IsOptional()
  description?: string;

 @ApiProperty({
  description : 'price of  the service',
  example : 24.4
 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description : 'duration of the service ',
    example : '4d'
  })
  @IsString()
  @MinLength(1)
  duration: string;

  @ApiProperty({
    description : 'see that the service is active',
    example : false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
