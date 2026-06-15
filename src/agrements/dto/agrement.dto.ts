import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AdresseDto } from './adresse.dto';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const PRESENT = (_: unknown, value: unknown) => value !== undefined;

/**
 * Valide une date facultative au format YYYY-MM-DD, en autorisant `null`
 * (pour vider le champ).
 */
function OptionalDate() {
  return ValidateIf((_, value) => value !== undefined && value !== null);
}

/** Champs communs aux agréments maternel et familial. */
abstract class AgrementBaseDto {
  @ValidateIf(PRESENT)
  @IsString()
  @IsNotEmpty()
  numeroDepartementalAgrement?: string;

  @ValidateIf(PRESENT)
  @IsString()
  @IsNotEmpty()
  identifiantDepartement?: string;

  @ValidateIf(PRESENT)
  @Matches(DATE_REGEX, {
    message: 'datePremiereDelivrance doit être au format YYYY-MM-DD.',
  })
  datePremiereDelivrance?: string;

  @OptionalDate()
  @Matches(DATE_REGEX)
  dateRenouvellement?: string | null;

  @OptionalDate()
  @Matches(DATE_REGEX)
  dateSuspensionTemporaire?: string | null;

  @OptionalDate()
  @Matches(DATE_REGEX)
  dateFinSuspensionTemporaire?: string | null;

  @OptionalDate()
  @Matches(DATE_REGEX)
  dateCessationTemporaire?: string | null;

  @OptionalDate()
  @Matches(DATE_REGEX)
  dateFinCessationTemporaire?: string | null;

  @OptionalDate()
  @Matches(DATE_REGEX)
  dateRetrait?: string | null;

  @OptionalDate()
  @Matches(DATE_REGEX)
  dateFinDefinitive?: string | null;

  @ValidateIf(PRESENT)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdresseDto)
  adressesAccueil?: AdresseDto[];
}

export class AssistantMaternelDto extends AgrementBaseDto {}

export class AssistantFamilialDto extends AgrementBaseDto {
  @ValidateIf(PRESENT)
  @Matches(DATE_REGEX, {
    message: 'diplomeDateObtention doit être au format YYYY-MM-DD.',
  })
  diplomeDateObtention?: string;
}

export class AgrementsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AssistantMaternelDto)
  assistantMaternel?: AssistantMaternelDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AssistantFamilialDto)
  assistantFamilial?: AssistantFamilialDto;
}
