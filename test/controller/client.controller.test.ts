import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../../src/controller/client.controller';
import { ClientServiceImpl } from '../../src/service/impl/client.service.impl';
import { ClientRequestDto } from '../../src/domain/dto/clientRequest.dto';
import { ClientUpdateDto } from '../../src/domain/dto/clientUpdate.dto';

describe('ClientController test', () => {
  let clientController: ClientController;
  let spyService: ClientServiceImpl;
  const mockMethods = {
    createClient: jest.fn(),
    getClient: jest.fn(),
    getClients: jest.fn(),
    updateClient: jest.fn(),
    deleteClient: jest.fn(),
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientServiceImpl,
          useFactory: () => mockMethods,
        },
      ],
    }).compile();

    clientController = module.get<ClientController>(ClientController);
    spyService = module.get<ClientServiceImpl>(ClientServiceImpl);
  });
  it('Should call createClient from service', async () => {
    const newClientDto = new ClientRequestDto();
    await clientController.createClient(1, newClientDto);
    expect(spyService.createClient).toHaveBeenCalled();
    expect(spyService.createClient).toHaveBeenCalledWith(1, newClientDto);
  });
  it('Should call getClient from service', async () => {
    await clientController.getClient(1);
    expect(spyService.getClient).toHaveBeenCalled();
    expect(spyService.getClient).toHaveBeenCalledWith(1);
  });
  it('Should call getClients from service', async () => {
    await clientController.getClients();
    expect(spyService.getClients).toHaveBeenCalled();
    expect(spyService.getClients).toHaveBeenCalledWith();
  });
  it('Should call updateClient from service', async () => {
    const newClientDto = new ClientUpdateDto();
    await clientController.updateClient(1, newClientDto);
    expect(spyService.updateClient).toHaveBeenCalled();
    expect(spyService.updateClient).toHaveBeenCalledWith(1, newClientDto);
  });
  it('Should call deleteClient from service', async () => {
    await clientController.deleteClient(1);
    expect(spyService.deleteClient).toHaveBeenCalled();
    expect(spyService.deleteClient).toHaveBeenCalledWith(1);
  });
});
