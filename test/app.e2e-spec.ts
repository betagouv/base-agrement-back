import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
      const connectionString = `${process.env.DATABASE_URL}`
      console.log("connectionString:", connectionString);
      const adapter = new PrismaPg({ connectionString })
      prisma = new PrismaClient({ adapter })
  })

  it('Si la connexion est établie, alors renvoie 200', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });

  it("Si la table est vide, renvoie 'tableau vide'", async () => {
    await prisma.hello_world.deleteMany();
    return request(app.getHttpServer())
      .get('/')
      .expect("tableau vide");
  });

  it("Si la table contient une ligne, renvoie l'id de la première ligne", async () => {
    await prisma.hello_world.create({
      data: {
        id: "123",
        name: "coucou",
      }
    });
    return request(app.getHttpServer())
      .get('/')
      .expect("123");
  }); 

  afterAll(async() => {
    await prisma.$disconnect();
    await app.close();
  });
});
