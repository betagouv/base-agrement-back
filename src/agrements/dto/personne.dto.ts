import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AdresseDto } from './adresse.dto';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const PRESENT = (_: unknown, value: unknown) => value !== undefined;

export class PersonneDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  personneId?: string;

  @ValidateIf(PRESENT)
  @IsString()
  @IsNotEmpty()
  civilite?: string;

  @ValidateIf(PRESENT)
  @IsString()
  @IsNotEmpty()
  nomNaissance?: string;

  @IsOptional()
  @IsString()
  nomUsage?: string | null;

  @ValidateIf(PRESENT)
  @IsString()
  @IsNotEmpty()
  prenom1?: string;

  @IsOptional()
  @IsString()
  prenom2?: string | null;

  @IsOptional()
  @IsString()
  prenom3?: string | null;

  @ValidateIf(PRESENT)
  @Matches(DATE_REGEX, {
    message: 'dateNaissance doit être au format YYYY-MM-DD.',
  })
  dateNaissance?: string;

  @ValidateIf(PRESENT)
  @IsString()
  @IsNotEmpty()
  lieuNaissancePays?: string;

  @IsOptional()
  @IsString()
  lieuNaissanceCommune?: string | null;

  @ValidateIf(PRESENT)
  @IsObject()
  @ValidateNested()
  @Type(() => AdresseDto)
  adresseResidence?: AdresseDto;
}
