import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initDb } from '../../../test/common/util/util.db';
import { ClientRequestDto } from '../../domain/dto/clientRequest.dto';
import { ClientResponseDto } from '../../domain/dto/clientResponse.dto';
import { ClientUpdateDto } from '../../domain/dto/clientUpdate.dto';
import { Client } from '../../domain/entity/client.entity';
import { ClientService } from '../client.service';

@Injectable()
export class ClientServiceImpl implements ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly _clientRepository: Repository<Client>,
  ) {
    if (process.env.NODE_ENV === 'test') {
      initDb(this._clientRepository);
    }
  }

  async createClient(
    id: number,
    client: ClientRequestDto,
  ): Promise<ClientResponseDto> {
    const clientToCreate: Client = await this._clientRepository.findOneBy({
      id,
    });
    if (clientToCreate) {
      throw new BadRequestException(`Client with id ${id} already exists`);
    }
    const newClient: Client = this._clientRepository.create({ id, ...client });
    const createdClient = await this._clientRepository.save(newClient);
    return new ClientResponseDto(createdClient);
  }

  async getClient(id: number): Promise<ClientResponseDto> {
    const client: Client = await this._clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return new ClientResponseDto(client);
  }

  async getClients(): Promise<ClientResponseDto[]> {
    return (await this._clientRepository.find()).map(
      (client) => new ClientResponseDto(client),
    );
  }

  async updateClient(
    id: number,
    clientData: ClientUpdateDto,
  ): Promise<ClientResponseDto> {
    const clientToUpdate: Client = await this._clientRepository.findOneBy({
      id,
    });
    if (!clientToUpdate) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    const updatedClient = await this._clientRepository.save({
      ...clientToUpdate,
      ...clientData,
      fecha_actualizacion: new Date(),
    });
    return new ClientResponseDto(updatedClient);
  }

  async deleteClient(id: number): Promise<void> {
    const clientToDelete: Client = await this._clientRepository.findOneBy({
      id,
    });
    if (!clientToDelete) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    await this._clientRepository.remove(clientToDelete);
  }
}
