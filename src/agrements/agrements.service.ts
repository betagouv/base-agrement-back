import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgrementDto } from './dto/create-agrement.dto';
import { PersonneDto } from './dto/personne.dto';
import { AssistantFamilialDto, AssistantMaternelDto } from './dto/agrement.dto';

type AnyRecord = Record<string, unknown>;

@Injectable()
export class AgrementsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Traite une requête de création / mise à jour d'une personne et de ses agréments.
   *
   * NB : selon la spec, ce traitement est censé être asynchrone (dépôt enregistré,
   * rapprochement RNIPP, rapport par mail). L'infrastructure de file d'attente et de
   * notification n'existe pas encore ; le traitement est donc effectué en ligne, dans
   * une transaction, et le contrôleur répond malgré tout 202 Accepted.
   */
  async traiter(dto: CreateAgrementDto): Promise<{ personneId: string }> {
    const { personne, agrements } = dto;

    if (!agrements.assistantMaternel && !agrements.assistantFamilial) {
      throw new BadRequestException(
        "L'objet agrements doit contenir au moins assistantMaternel ou assistantFamilial.",
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const personneId = personne.personneId
        ? await this.mettreAJourPersonne(tx, personne)
        : await this.creerPersonne(tx, personne);

      if (agrements.assistantMaternel) {
        await this.upsertAssistantMaternel(
          tx,
          personneId,
          agrements.assistantMaternel,
        );
      }
      if (agrements.assistantFamilial) {
        await this.upsertAssistantFamilial(
          tx,
          personneId,
          agrements.assistantFamilial,
        );
      }

      return { personneId };
    });
  }

  // --------------------------------------------------------------------------
  // Personne
  // --------------------------------------------------------------------------

  private async creerPersonne(tx: PrismaTx, p: PersonneDto): Promise<string> {
    this.exigerChamps('personne', p, [
      'civilite',
      'nomNaissance',
      'prenom1',
      'dateNaissance',
      'lieuNaissancePays',
      'adresseResidence',
    ]);

    const created = await tx.personne.create({
      data: this.construireDonneesPersonne(p) as never,
    });
    return created.id;
  }

  private async mettreAJourPersonne(
    tx: PrismaTx,
    p: PersonneDto,
  ): Promise<string> {
    const existante = await tx.personne.findUnique({
      where: { id: p.personneId },
    });
    if (!existante) {
      throw new NotFoundException(
        `Aucune personne avec l'identifiant ${p.personneId}.`,
      );
    }

    await tx.personne.update({
      where: { id: p.personneId },
      data: this.construireDonneesPersonne(p) as never,
    });
    return existante.id;
  }

  private construireDonneesPersonne(p: PersonneDto): AnyRecord {
    const data = this.collecter(p as AnyRecord, {
      civilite: { col: 'civilite' },
      nomNaissance: { col: 'nom_naissance' },
      nomUsage: { col: 'nom_usage' },
      prenom1: { col: 'prenom_1' },
      prenom2: { col: 'prenom_2' },
      prenom3: { col: 'prenom_3' },
      dateNaissance: { col: 'date_naissance', transform: toDate },
      lieuNaissancePays: { col: 'lieu_naissance_pays' },
      lieuNaissanceCommune: { col: 'lieu_naissance_commune' },
    });

    if ('adresseResidence' in p && p.adresseResidence) {
      Object.assign(
        data,
        this.collecter(p.adresseResidence as AnyRecord, {
          numeroVoie: { col: 'residence_numero_voie' },
          complementVoie: { col: 'residence_complement_voie' },
          nomVoie: { col: 'residence_nom_voie' },
          codePostal: { col: 'residence_code_postal' },
          codeInseeCommune: { col: 'residence_code_insee_commune' },
        }),
      );
    }

    return data;
  }

  // --------------------------------------------------------------------------
  // Agréments
  // --------------------------------------------------------------------------

  private async upsertAssistantMaternel(
    tx: PrismaTx,
    personneId: string,
    am: AssistantMaternelDto,
  ): Promise<void> {
    const existant = await tx.agrement_assistant_maternel.findUnique({
      where: { personne_id: personneId },
    });

    if (existant) {
      await tx.agrement_assistant_maternel.update({
        where: { personne_id: personneId },
        data: this.construireDonneesAgrement(am) as never,
      });
      return;
    }

    this.exigerChamps('assistantMaternel', am, [
      'numeroDepartementalAgrement',
      'identifiantDepartement',
      'datePremiereDelivrance',
      'adressesAccueil',
    ]);
    await tx.agrement_assistant_maternel.create({
      data: {
        ...this.construireDonneesAgrement(am),
        personne_id: personneId,
      } as never,
    });
  }

  private async upsertAssistantFamilial(
    tx: PrismaTx,
    personneId: string,
    af: AssistantFamilialDto,
  ): Promise<void> {
    const existant = await tx.agrement_assistant_familial.findUnique({
      where: { personne_id: personneId },
    });

    if (existant) {
      await tx.agrement_assistant_familial.update({
        where: { personne_id: personneId },
        data: this.construireDonneesAgrement(af) as never,
      });
      return;
    }

    this.exigerChamps('assistantFamilial', af, [
      'numeroDepartementalAgrement',
      'identifiantDepartement',
      'datePremiereDelivrance',
      'diplomeDateObtention',
      'adressesAccueil',
    ]);
    await tx.agrement_assistant_familial.create({
      data: {
        ...this.construireDonneesAgrement(af),
        personne_id: personneId,
      } as never,
    });
  }

  private construireDonneesAgrement(
    a: AssistantMaternelDto | AssistantFamilialDto,
  ): AnyRecord {
    const data = this.collecter(a as AnyRecord, {
      numeroDepartementalAgrement: { col: 'numero_departemental_agrement' },
      identifiantDepartement: { col: 'identifiant_departement' },
      datePremiereDelivrance: {
        col: 'date_premiere_delivrance',
        transform: toDate,
      },
      dateRenouvellement: { col: 'date_renouvellement', transform: toDate },
      dateSuspensionTemporaire: {
        col: 'date_suspension_temporaire',
        transform: toDate,
      },
      dateFinSuspensionTemporaire: {
        col: 'date_fin_suspension_temporaire',
        transform: toDate,
      },
      dateCessationTemporaire: {
        col: 'date_cessation_temporaire',
        transform: toDate,
      },
      dateFinCessationTemporaire: {
        col: 'date_fin_cessation_temporaire',
        transform: toDate,
      },
      dateRetrait: { col: 'date_retrait', transform: toDate },
      dateFinDefinitive: { col: 'date_fin_definitive', transform: toDate },
      diplomeDateObtention: {
        col: 'diplome_date_obtention',
        transform: toDate,
      },
    });

    if ('adressesAccueil' in a && Array.isArray(a.adressesAccueil)) {
      data.adresses_accueil = a.adressesAccueil.map((adr) =>
        this.collecter(adr as AnyRecord, {
          numeroVoie: { col: 'numero_voie' },
          complementVoie: { col: 'complement_voie' },
          nomVoie: { col: 'nom_voie' },
          codePostal: { col: 'code_postal' },
          codeInseeCommune: { col: 'code_insee_commune' },
        }),
      );
    }

    return data;
  }

  // --------------------------------------------------------------------------
  // Utilitaires
  // --------------------------------------------------------------------------

  /**
   * Ne reporte que les champs réellement présents dans la requête (clé présente).
   * `null` est conservé (vidage d'un champ facultatif) ; une clé absente est ignorée.
   */
  private collecter(
    source: AnyRecord,
    mapping: Record<
      string,
      { col: string; transform?: (v: unknown) => unknown }
    >,
  ): AnyRecord {
    const out: AnyRecord = {};
    for (const [key, { col, transform }] of Object.entries(mapping)) {
      if (!(key in source)) continue;
      const value = source[key];
      out[col] = value === null || !transform ? value : transform(value);
    }
    return out;
  }

  private exigerChamps(
    contexte: string,
    source: object,
    champs: string[],
  ): void {
    const rec = source as AnyRecord;
    const manquants = champs.filter(
      (c) => !(c in rec) || rec[c] === null || rec[c] === undefined,
    );
    if (manquants.length > 0) {
      throw new BadRequestException(
        `Champs obligatoires manquants pour ${contexte} (création) : ${manquants.join(', ')}.`,
      );
    }
  }
}

function toDate(value: unknown): Date {
  return new Date(value as string);
}

/** Client de transaction Prisma, tel que fourni au callback de `$transaction`. */
type PrismaTx = Parameters<Parameters<PrismaService['$transaction']>[0]>[0];
