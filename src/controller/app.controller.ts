import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppServiceImpl } from '../service/impl/app.service.impl';
import { HealthCheckResponseDto } from '../domain/dto/healthCheckResponse.dto';

@Controller()
@ApiTags('Health')
export class AppController {
  constructor(private readonly appService: AppServiceImpl) {}

  @Get('health-check')
  getHealth(): HealthCheckResponseDto {
    return this.appService.getHealth();
  }
}
