import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Interaccion } from '../types/interacciones';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInteraccioneDto {
  @ApiProperty({
    description: 'the type that come of message ',
    enum: Interaccion,
    example: Interaccion.admin || Interaccion.user,
  })
  @IsEnum(Interaccion)
  remitente: Interaccion;

  @ApiProperty({
    description: 'the messsage that come from n8n',
    example: 'tell me how many services we have',
  })
  @IsString()
  @MaxLength(1000)
  contenido: string;

  @ApiProperty({
    description: 'the id that come from n8n',
    example: '5c41af64-f3a6-4e83-942f-e79f31eff7f8',
  })
  @IsNotEmpty()
  userId: string;
}
