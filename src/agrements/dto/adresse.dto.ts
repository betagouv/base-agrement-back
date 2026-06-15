import { IsOptional, IsString, Matches } from 'class-validator';

/**
 * Bloc adresse commun à l'adresse de résidence de la personne
 * et aux adresses d'accueil des agréments.
 *
 * Tous les champs sont facultatifs. Pour vider un champ, transmettre `null`.
 */
export class AdresseDto {
  @IsOptional()
  @IsString()
  numeroVoie?: string | null;

  @IsOptional()
  @IsString()
  complementVoie?: string | null;

  @IsOptional()
  @IsString()
  nomVoie?: string | null;

  @IsOptional()
  @Matches(/^\d{5}$/, { message: 'codePostal doit comporter 5 chiffres.' })
  codePostal?: string | null;

  @IsOptional()
  @IsString()
  codeInseeCommune?: string | null;
}
