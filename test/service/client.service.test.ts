import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientRequestDto } from '../../src/domain/dto/clientRequest.dto';
import { ClientResponseDto } from '../../src/domain/dto/clientResponse.dto';
import { ClientUpdateDto } from '../../src/domain/dto/clientUpdate.dto';
import { Client } from '../../src/domain/entity/client.entity';
import { ClientServiceImpl } from '../../src/service/impl/client.service.impl';
import { clientsDataTest } from '../common/util/util.db';

describe('ClientService', () => {
  let clientService: ClientServiceImpl;

  const mockMethods = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientServiceImpl,
        {
          provide: getRepositoryToken(Client),
          useFactory: () => mockMethods,
        },
      ],
    }).compile();

    clientService = module.get<ClientServiceImpl>(ClientServiceImpl);
  });

  describe('createClient', () => {
    it('should call findOneBy, create and save and end successfully', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      const clientRequestDto = new ClientRequestDto(client);
      mockMethods.findOneBy.mockReturnValue(null);
      mockMethods.create.mockReturnValue(client);
      mockMethods.save.mockReturnValue(client);

      const result = await clientService.createClient(
        client.id,
        clientRequestDto,
      );
      expect(mockMethods.findOneBy).toHaveBeenCalledWith({ id: client.id });
      expect(mockMethods.create).toHaveBeenCalledWith({
        id: client.id,
        ...clientRequestDto,
      });
      expect(mockMethods.save).toHaveBeenCalledWith(client);
      expect(result).toEqual(new ClientResponseDto(client));
    });
    it('should throw BadRequestException if client already exists', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      const clientRequestDto = new ClientRequestDto(client);
      mockMethods.findOneBy.mockReturnValue(client);

      await expect(
        clientService.createClient(client.id, clientRequestDto),
      ).rejects.toThrow(
        new BadRequestException(`Client with id ${client.id} already exists`),
      );
    });
  });
  describe('getClient', () => {
    it('should call findOneBy and end successfully', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      mockMethods.findOneBy.mockReturnValue(client);

      const result = await clientService.getClient(client.id);
      expect(mockMethods.findOneBy).toHaveBeenCalledWith({ id: client.id });
      expect(result).toEqual(new ClientResponseDto(client));
    });
    it('should throw NotFoundException if findOneBy is null', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      mockMethods.findOneBy.mockReturnValue(null);

      await expect(clientService.getClient(client.id)).rejects.toThrow(
        new NotFoundException(`Client with id ${client.id} not found`),
      );
    });
  });
  describe('updateClient', () => {
    it('should call findOneBy, save and end successfully', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      const clientUpdateDto = new ClientUpdateDto(client);
      mockMethods.findOneBy.mockReturnValue(client);
      mockMethods.save.mockReturnValue(client);

      const result = await clientService.updateClient(
        client.id,
        clientUpdateDto,
      );
      expect(mockMethods.findOneBy).toHaveBeenCalledWith({ id: client.id });
      expect(mockMethods.save).toHaveBeenCalledWith(client);
      expect(result).toEqual(new ClientResponseDto(client));
    });
    it('should throw NotFoundException if findOneBy is null', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      const clientUpdateDto = new ClientUpdateDto(client);
      mockMethods.findOneBy.mockReturnValue(null);

      await expect(
        clientService.updateClient(client.id, clientUpdateDto),
      ).rejects.toThrow(
        new NotFoundException(`Client with id ${client.id} not found`),
      );
    });
  });
  describe('deleteClient', () => {
    it('should call findOneBy, client to delete called remove and end successfully', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      mockMethods.findOneBy.mockReturnValue(client);
      mockMethods.remove.mockReturnValue(client);

      await clientService.deleteClient(client.id);
      expect(mockMethods.findOneBy).toHaveBeenCalledWith({ id: client.id });
      expect(mockMethods.remove).toHaveBeenCalledWith(client);
    });
    it('should throw NotFoundException if findOneBy is null', async () => {
      const client_data = clientsDataTest[0];
      const client = new Client(client_data);
      mockMethods.findOneBy.mockReturnValue(null);

      await expect(clientService.deleteClient(client.id)).rejects.toThrow(
        new NotFoundException(`Client with id ${client.id} not found`),
      );
    });
  });
});
