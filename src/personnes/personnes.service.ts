import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export interface CriteresConsultation {
  nomNaissance?: string;
  prenom1?: string;
  dateNaissance?: string;
}

type AnyRecord = Record<string, unknown>;

@Injectable()
export class PersonnesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Consultation d'une personne et de ses agréments à partir de l'identité
   * (nom de naissance + premier prénom + date de naissance).
   */
  async consulter(criteres: CriteresConsultation) {
    const { nomNaissance, prenom1, dateNaissance } = criteres;

    if (
      !nomNaissance ||
      !prenom1 ||
      !dateNaissance ||
      !DATE_REGEX.test(dateNaissance)
    ) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Paramètre obligatoire manquant.',
      });
    }

    const personne = await this.prisma.personne.findFirst({
      where: {
        nom_naissance: nomNaissance,
        prenom_1: prenom1,
        date_naissance: new Date(dateNaissance),
      },
      include: {
        agrement_assistant_maternel: true,
        agrement_assistant_familial: true,
      },
    });

    if (!personne) {
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'Aucune donnée ne correspond aux critères fournis.',
      });
    }

    const agrements: AnyRecord = {};
    if (personne.agrement_assistant_maternel) {
      agrements.assistantMaternel = this.formaterAgrement(
        personne.agrement_assistant_maternel,
        false,
      );
    }
    if (personne.agrement_assistant_familial) {
      agrements.assistantFamilial = this.formaterAgrement(
        personne.agrement_assistant_familial,
        true,
      );
    }

    return {
      personne: {
        personneId: personne.id,
        civilite: personne.civilite,
        nomNaissance: personne.nom_naissance,
        nomUsage: personne.nom_usage,
        prenom1: personne.prenom_1,
        prenom2: personne.prenom_2,
        prenom3: personne.prenom_3,
        dateNaissance: this.formaterDate(personne.date_naissance),
        lieuNaissancePays: personne.lieu_naissance_pays,
        lieuNaissanceCommune: personne.lieu_naissance_commune,
        adresseResidence: {
          numeroVoie: personne.residence_numero_voie,
          complementVoie: personne.residence_complement_voie,
          nomVoie: personne.residence_nom_voie,
          codePostal: personne.residence_code_postal,
          codeInseeCommune: personne.residence_code_insee_commune,
        },
      },
      agrements,
    };
  }

  private formaterAgrement(
    a: {
      numero_departemental_agrement: string;
      identifiant_departement: string;
      date_premiere_delivrance: Date;
      date_renouvellement: Date | null;
      date_suspension_temporaire: Date | null;
      date_fin_suspension_temporaire: Date | null;
      date_cessation_temporaire: Date | null;
      date_fin_cessation_temporaire: Date | null;
      date_retrait: Date | null;
      date_fin_definitive: Date | null;
      diplome_date_obtention?: Date;
      adresses_accueil: unknown[];
    },
    familial: boolean,
  ) {
    const base = {
      numeroDepartementalAgrement: a.numero_departemental_agrement,
      identifiantDepartement: a.identifiant_departement,
      datePremiereDelivrance: this.formaterDate(a.date_premiere_delivrance),
      dateRenouvellement: this.formaterDate(a.date_renouvellement),
      dateSuspensionTemporaire: this.formaterDate(a.date_suspension_temporaire),
      dateFinSuspensionTemporaire: this.formaterDate(
        a.date_fin_suspension_temporaire,
      ),
      dateCessationTemporaire: this.formaterDate(a.date_cessation_temporaire),
      dateFinCessationTemporaire: this.formaterDate(
        a.date_fin_cessation_temporaire,
      ),
      dateRetrait: this.formaterDate(a.date_retrait),
      dateFinDefinitive: this.formaterDate(a.date_fin_definitive),
      adressesAccueil: (a.adresses_accueil ?? []).map((adr) =>
        this.formaterAdresse(adr as AnyRecord),
      ),
    };

    if (familial) {
      return {
        ...base,
        diplomeDateObtention: this.formaterDate(a.diplome_date_obtention),
      };
    }
    return base;
  }

  private formaterAdresse(adr: AnyRecord) {
    return {
      numeroVoie: adr.numero_voie ?? null,
      complementVoie: adr.complement_voie ?? null,
      nomVoie: adr.nom_voie ?? null,
      codePostal: adr.code_postal ?? null,
      codeInseeCommune: adr.code_insee_commune ?? null,
    };
  }

  private formaterDate(date: Date | null | undefined): string | null {
    return date ? date.toISOString().slice(0, 10) : null;
  }
}
