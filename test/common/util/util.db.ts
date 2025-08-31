import { Client } from '../../../src/domain/entity/client.entity';
import { Repository } from 'typeorm';
export const clientsDataTest = [
  {
    id: 1,
    email: 'ramiroambrosi2021@gmail.com',
    prioridad: 1,
    offset: 0,
    fecha_creacion: '2021-12-27 17:06:11.570',
    fecha_actualizacion: '2021-12-27 17:06:30.685',
  },
  {
    id: 2,
    email: 'fernandodavila58@hotmail.com',
    prioridad: 2,
    offset: 0,
    fecha_creacion: '2022-01-25 14:54:35.872',
    fecha_actualizacion: '2022-01-25 14:57:59.763',
  },
  {
    id: 3,
    email: 'scordova1955@hotmail.com',
    prioridad: 3,
    offset: 0,
    fecha_creacion: '2021-12-21 14:18:10.126',
    fecha_actualizacion: '2021-12-21 14:20:00.084',
  },
  {
    id: 4,
    email: 'sandra1975padilla@gmail.com',
    prioridad: 4,
    offset: 0,
    fecha_creacion: '2022-01-20T09:52:10.502',
    fecha_actualizacion: '2022-01-20 10:00:38.200',
  },
  {
    id: 5,
    email: 'alexpatricio12@yahoo.com',
    prioridad: 5,
    offset: 0,
    fecha_creacion: '2022-01-21 16:08:08.651',
    fecha_actualizacion: '2022-01-21 16:09:45.059',
  },
];
export function initDb(repository: Repository<Client>) {
  for (const client of clientsDataTest) {
    repository.save(client);
  }
}
