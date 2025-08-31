import { HealthCheckResponseDto } from '../domain/dto/healthCheckResponse.dto';

export interface AppService {
  getHealth(): HealthCheckResponseDto;
}
