import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { PersonneDto } from './personne.dto';
import { AgrementsDto } from './agrement.dto';

/**
 * Corps de la requête POST /v1/agrements.
 *
 * Règles métier supplémentaires (présence des champs obligatoires en création,
 * présence d'au moins un agrément) vérifiées dans AgrementsService.
 */
export class CreateAgrementDto {
  @IsObject()
  @ValidateNested()
  @Type(() => PersonneDto)
  personne: PersonneDto;

  @IsObject()
  @ValidateNested()
  @Type(() => AgrementsDto)
  agrements: AgrementsDto;
}
