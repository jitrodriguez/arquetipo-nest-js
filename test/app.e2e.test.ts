import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../src/controller/app.controller';
import { AppServiceImpl } from '../src/service/impl/app.service.impl';
import { MainModule } from '../src/module';
import { config } from './config/config';
import { clientsDataTest } from './common/util/util.db';

describe('App test (e2e)', () => {
  let app: INestApplication;
  const baseUrlClient = '/client';
  const client_data = clientsDataTest[0];
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        MainModule,
      ],
      controllers: [AppController],
      providers: [AppServiceImpl],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Health Check', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/health-check')
        .expect(200)
        .expect('{"status":"UP"}');
    });
  });
  describe('Client', () => {
    describe('Create client', () => {
      it(`Create client ${baseUrlClient}/100 (POST)`, () => {
        return request(app.getHttpServer())
          .post(`${baseUrlClient}/100`)
          .send(client_data)
          .expect(201);
      });
      it(`Client already exists ${baseUrlClient}/${client_data.id} (POST)`, () => {
        return request(app.getHttpServer())
          .post(`${baseUrlClient}/${client_data.id}`)
          .send(client_data)
          .expect(400);
      });
    });
    describe('Get client(s)', () => {
      it(`Get client ${baseUrlClient}/${client_data.id} (GET)`, () => {
        const path = `${baseUrlClient}/${client_data.id}`;
        return request(app.getHttpServer())
          .get(path)
          .expect(200)
          .expect((data) => {
            expect(data.body.email).toBe(client_data.email);
            expect(data.body.prioridad).toBe(client_data.prioridad);
            expect(data.body.offset).toBe(client_data.offset);
            expect(new Date(data.body.fecha_creacion)).toStrictEqual(
              client_data.fecha_creacion
            );
          });
      });
      it(`Get all clients ${baseUrlClient} (GET)`, () => {
        return request(app.getHttpServer())
          .get(baseUrlClient)
          .expect(200)
          .expect((data) => {
            expect(data.body[0].email).toBe(client_data.email);
            expect(data.body[0].prioridad).toBe(client_data.prioridad);
            expect(data.body[0].offset).toBe(client_data.offset);
            expect(new Date(data.body[0].fecha_creacion)).toStrictEqual(
              client_data.fecha_creacion
            );
          });
      });
      it(`Client not found ${baseUrlClient}/20000 (GET)`, () => {
        const path = `${baseUrlClient}/20000`;
        return request(app.getHttpServer()).get(path).expect(404);
      });
    });
    describe('Update client', () => {
      it(`Update client ${baseUrlClient}/${client_data.id} (PUT)`, () => {
        const path = `${baseUrlClient}/${client_data.id}`;
        const new_client_data = {
          ...client_data,
          email: 'test@email.com',
        };
        return request(app.getHttpServer())
          .put(path)
          .send(new_client_data)
          .expect(200)
          .expect((data) => {
            expect(data.body.email).toBe(new_client_data.email);
            expect(data.body.prioridad).toBe(client_data.prioridad);
            expect(data.body.offset).toBe(client_data.offset);
            expect(new Date(data.body.fecha_creacion)).toStrictEqual(
              client_data.fecha_creacion
            );
          });
      });
      it(`Client not found ${baseUrlClient}/20000 (PUT)`, () => {
        const path = `${baseUrlClient}/20000`;
        const new_client_data = {
          ...client_data,
          email: '',
        };
        return request(app.getHttpServer())
          .put(path)
          .send(new_client_data)
          .expect(404);
      });
    });
    describe('Delete client', () => {
      it(`Delete client ${baseUrlClient}/${client_data.id} (DELETE)`, () => {
        const path = `${baseUrlClient}/${client_data.id}`;
        return request(app.getHttpServer()).delete(path).expect(204);
      });
      it(`Client not found ${baseUrlClient}/20000 (DELETE)`, () => {
        const path = `${baseUrlClient}/20000`;
        return request(app.getHttpServer()).delete(path).expect(404);
      });
    });
  });
});
