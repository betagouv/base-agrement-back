import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const connectionString = `${process.env.DATABASE_URL}`
    console.log("connectionString:", connectionString);
    const adapter = new PrismaPg({ connectionString })
    const prisma = new PrismaClient({ adapter })

    const hello = await prisma.hello_world.findMany();
    if (hello.length === 0) {
      return "tableau vide";
    }else{    
      return hello[0].id;
    }
  }
}
