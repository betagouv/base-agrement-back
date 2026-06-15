import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { PersonnesService } from './personnes.service';

@Controller({ path: 'personnes', version: '1' })
@UseGuards(BearerAuthGuard)
export class PersonnesController {
  constructor(private readonly personnesService: PersonnesService) {}

  /**
   * Consultation d'une personne et de ses agréments.
   *
   * Les paramètres (nomNaissance, prenom1, dateNaissance) sont obligatoires.
   * Réponses : 200 (trouvée), 404 NOT_FOUND, 400 VALIDATION_ERROR.
   */
  @Get()
  consulter(
    @Query('nomNaissance') nomNaissance?: string,
    @Query('prenom1') prenom1?: string,
    @Query('dateNaissance') dateNaissance?: string,
  ) {
    return this.personnesService.consulter({
      nomNaissance,
      prenom1,
      dateNaissance,
    });
  }
}
