import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });



async function reset() {
  // Clean tables in an order that avoids FK issues
  await prisma.adresse_accueil.deleteMany();
  await prisma.agrement_assistant_maternel.deleteMany();
  await prisma.agrement_assistant_familial.deleteMany();
  await prisma.personne.deleteMany();
}

async function main() {
  await reset();

  // agrément assistant maternel, 1 adresse d'accueil
  const assMat1 = await prisma.personne.create({
    data: {
      civilite: 'Mme',
      nom_naissance: 'DIALLO',
      prenom_1: 'Fatoumata',
      date_naissance: new Date('1990-01-01'),
      lieu_naissance_pays: 'BF',
      agrement_assistant_maternel: {
        create: {
          identifiant_departement: '75',
          date_premiere_delivrance: new Date('2020-01-01'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '100',
                nom_voie: 'Rue de Rivoli',
                code_postal: '75001',
                code_insee_commune: '75101',
              },
            ],
          },
        },
      },
    },
  });

  // agrément assistant familial, 1 adresse d'accueil
  const assFam1 = await prisma.personne.create({
    data: {
      civilite: 'M',
      nom_naissance: 'DUPONT',
      prenom_1: 'Nicolas',
      date_naissance: new Date('1985-02-02'),
      lieu_naissance_pays: 'FR',
      agrement_assistant_familial: {
        create: {
          identifiant_departement: '33',
          date_premiere_delivrance: new Date('2021-02-03'),
          diplome_date_obtention: new Date('2021-01-02'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '2',
                nom_voie: 'Rue du Temple',
                code_postal: '33000',
                code_insee_commune: '33063',
              },
            ],
          },
        },
      },
    },
  });

  // agrément assistant maternel, 2 adresses d'accueil
  const assMat2 = await prisma.personne.create({
    data: {
      civilite: 'Mme',
      nom_naissance: 'DUPOND',
      prenom_1: 'Marie',
      date_naissance: new Date('1991-11-11'),
      lieu_naissance_pays: 'FR',
      agrement_assistant_maternel: {
        create: {
          identifiant_departement: '93',
          date_premiere_delivrance: new Date('2023-02-01'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '100',
                nom_voie: 'Avenue Jean Lolive',
                code_postal: '93500',
                code_insee_commune: '93055',
              },
              {
                numero_voie: '101',
                nom_voie: 'Avenue Jean Lolive',
                code_postal: '93500',
                code_insee_commune: '93055',
              },
            ],
          },
        },
      },
    },
  });

  // les deux agréments (1 adresse chacun)
  const assMatFam = await prisma.personne.create({
    data: {
      civilite: 'Mme',
      nom_naissance: 'DUPONDT',
      prenom_1: 'Christine',
      date_naissance: new Date('1990-01-02'),
      lieu_naissance_pays: 'FR',
      agrement_assistant_maternel: {
        create: {
          identifiant_departement: '13',
          date_premiere_delivrance: new Date('2010-11-12'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '101',
                nom_voie: 'Avenue Jean Lolive',
                code_postal: '93500',
                code_insee_commune: '93055',
              },
            ],
          },
        },
      },
      agrement_assistant_familial: {
        create: {
          identifiant_departement: '13',
          date_premiere_delivrance: new Date('2020-11-12'),
          diplome_date_obtention: new Date('2020-11-12'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '101',
                nom_voie: 'Avenue Jean Lolive',
                code_postal: '93500',
                code_insee_commune: '93055',
              },
            ],
          },
        },
      },
    },
  });

  // sans agrément
  const pSansAgrement = await prisma.personne.create({
    data: {
      civilite: 'Mme',
      nom_naissance: 'MOREAU',
      prenom_1: 'Emma',
      date_naissance: new Date('2002-02-20'),
      lieu_naissance_pays: 'FR',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
