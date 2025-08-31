import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientRequestDto } from '../domain/dto/clientRequest.dto';
import { ClientResponseDto } from '../domain/dto/clientResponse.dto';
import { ClientUpdateDto } from '../domain/dto/clientUpdate.dto';
import { ClientServiceImpl } from '../service/impl/client.service.impl';

@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly _clientService: ClientServiceImpl) {}

  @Post('/:id')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({ summary: 'Create a client' })
  async createClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() clientData: ClientRequestDto
  ): Promise<ClientResponseDto> {
    return this._clientService.createClient(id, clientData);
  }

  @Get('/:id')
  @ApiNotFoundResponse({ description: 'Client Not Found' })
  @ApiOperation({ summary: 'Get a client' })
  async getClient(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ClientResponseDto> {
    return this._clientService.getClient(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  async getClients(): Promise<ClientResponseDto[]> {
    return this._clientService.getClients();
  }

  @Put('/:id')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Client Not Found' })
  @ApiOperation({ summary: 'Update client' })
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: ClientUpdateDto
  ): Promise<ClientResponseDto> {
    return this._clientService.updateClient(id, client);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a client' })
  async deleteClient(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._clientService.deleteClient(id);
  }
}
