import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AgrementsModule } from './agrements/agrements.module';
import { PersonnesModule } from './personnes/personnes.module';

@Module({
  imports: [PrismaModule, AgrementsModule, PersonnesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
