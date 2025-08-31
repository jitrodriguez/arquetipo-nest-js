import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({ description: 'Status', example: 'UP' })
  status: string;
}
