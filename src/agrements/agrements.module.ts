import { Module } from '@nestjs/common';
import { AgrementsController } from './agrements.controller';
import { AgrementsService } from './agrements.service';

@Module({
  controllers: [AgrementsController],
  providers: [AgrementsService],
})
export class AgrementsModule {}
