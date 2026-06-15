import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { AgrementsService } from './agrements.service';
import { CreateAgrementDto } from './dto/create-agrement.dto';

@Controller({ path: 'agrements', version: '1' })
@UseGuards(BearerAuthGuard)
export class AgrementsController {
  constructor(private readonly agrementsService: AgrementsService) {}

  /**
   * Dépôt unitaire d'une personne et de ses agréments.
   *
   * Répond 202 Accepted : la demande est enregistrée. Le rapport des éventuelles
   * lignes rejetées est transmis par mail (traitement asynchrone côté plateforme).
   */
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async deposer(@Body() dto: CreateAgrementDto): Promise<{ message: string }> {
    await this.agrementsService.traiter(dto);
    return {
      message:
        'Demande enregistrée. Le rapport des requêtes rejetées vous sera transmis par mail.',
    };
  }
}
