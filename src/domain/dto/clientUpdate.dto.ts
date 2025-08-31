import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Client } from '../entity/client.entity';
export class ClientUpdateDto {
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
  @IsInt()
  @IsOptional()
  offset: number;
  @IsInt()
  @IsOptional()
  prioridad: number;
}
