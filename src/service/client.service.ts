import { ClientRequestDto } from '../domain/dto/clientRequest.dto';
import { ClientResponseDto } from '../domain/dto/clientResponse.dto';
import { ClientUpdateDto } from '../domain/dto/clientUpdate.dto';

export interface ClientService {
  createClient(
    id: number,
    client: ClientRequestDto,
  ): Promise<ClientResponseDto>;
  getClient(id: number): Promise<ClientResponseDto>;
  getClients(): Promise<ClientResponseDto[]>;
  updateClient(id: number, client: ClientUpdateDto): Promise<ClientResponseDto>;
  deleteClient(id: number): Promise<any>;
}
