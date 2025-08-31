import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Client } from '../entity/client.entity';
export class ClientRequestDto {
  constructor(client?: Client) {
    if (client) {
      this.email = client.email;
      this.offset = client.offset;
      this.prioridad = client.prioridad;
    }
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Client email',
    example: 'arquetipo@email.com',
  })
  email: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Client offset',
    example: '11111111',
    maxLength: 8,
    minLength: 0,
  })
  offset: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Client priority',
    example: '5',
    maxLength: 15,
    minLength: 0,
  })
  prioridad: number;
}
