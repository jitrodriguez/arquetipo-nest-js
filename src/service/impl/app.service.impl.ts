import { Injectable } from '@nestjs/common';
import { HealthCheckResponseDto } from '@domain/dto/healthCheckResponse.dto';
import { AppService } from '../app.service';

@Injectable()
export class AppServiceImpl implements AppService {
  getHealth(): HealthCheckResponseDto {
    return { status: 'UP' };
  }
}
