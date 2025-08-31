import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Client } from '../entity/client.entity';

export class ClientResponseDto {
  constructor(client?: Client) {
    if (client) {
      this.email = client.email;
      this.offset = client.offset;
      this.prioridad = client.prioridad;
      this.fecha_creacion = new Date(client.fecha_creacion);
    }
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Client email',
    example: 'arquetipo@email.com',
  })
  email: string;

  @IsInt()
  @ApiProperty({ description: 'Client offset', example: '11111111' })
  offset: number;

  @IsInt()
  @ApiProperty({ description: 'Client priority', example: '5' })
  prioridad: number;

  @IsDate()
  @ApiProperty({
    description: 'Client creation date',
    example: '2022-06-15T17:33:11.000Z',
  })
  fecha_creacion: Date;
}
