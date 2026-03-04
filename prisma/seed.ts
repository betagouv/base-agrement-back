import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Personne A: aucun agrément
  await prisma.personne.create({
    data: {
      civilite: 'Mme',
      nom_naissance: 'Sansagrement',
      prenom_1: 'Alice',
      date_naissance: new Date('1985-03-15'),
      lieu_naissance_pays: 'France',
      lieu_naissance_commune: 'Paris',
    },
  });

  // Personne B: un seul agrément (assistant maternel)
  await prisma.personne.create({
    data: {
      civilite: 'M.',
      nom_naissance: 'MaternelUniq',
      prenom_1: 'Bruno',
      date_naissance: new Date('1990-07-22'),
      lieu_naissance_pays: 'France',
      lieu_naissance_commune: 'Lyon',
      agrement_assistant_maternel: {
        create: {
          agrement_identifiant_departement: '69',
          agrement_date_premiere_delivrance: new Date('2018-05-10'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '45',
                complement_voie: 'Avenue des Champs',
                code_postal: '69001',
                code_insee_commune: '69381',
              },
            ],
          },
        },
      },
    },
  });

  // Personne C: un seul agrément (assistant familial) AVEC deux adresses d'accueil
  await prisma.personne.create({
    data: {
      civilite: 'Mme',
      nom_naissance: 'FamilialDeuxAdr',
      nom_usage: 'Martin',
      prenom_1: 'Claire',
      date_naissance: new Date('1988-09-18'),
      lieu_naissance_pays: 'France',
      lieu_naissance_commune: 'Toulouse',
      agrement_assistant_familial: {
        create: {
          agrement_identifiant_departement: '31',
          agrement_date_premiere_delivrance: new Date('2021-06-15'),
          diplome_date_obtention: new Date('2020-12-10'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '8',
                complement_voie: 'Boulevard Victor Hugo',
                code_postal: '31000',
                code_insee_commune: '31555',
              },
              {
                numero_voie: '12',
                complement_voie: 'Rue de la Paix',
                code_postal: '31100',
                code_insee_commune: '31555',
              },
            ],
          },
        },
      },
    },
  });

  // Personne D: agrément de chaque (maternel + familial)
  await prisma.personne.create({
    data: {
      civilite: 'M.',
      nom_naissance: 'DeuxAgrements',
      prenom_1: 'David',
      date_naissance: new Date('1982-11-03'),
      lieu_naissance_pays: 'France',
      lieu_naissance_commune: 'Marseille',
      agrement_assistant_maternel: {
        create: {
          agrement_identifiant_departement: '13',
          agrement_date_premiere_delivrance: new Date('2019-03-20'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '5',
                complement_voie: 'Rue Saint-Ferréol',
                code_postal: '13001',
                code_insee_commune: '13055',
              },
            ],
          },
        },
      },
      agrement_assistant_familial: {
        create: {
          agrement_identifiant_departement: '13',
          agrement_date_premiere_delivrance: new Date('2020-01-15'),
          diplome_date_obtention: new Date('2019-06-30'),
          adresses_accueil: {
            create: [
              {
                numero_voie: '7',
                complement_voie: 'Cours Lieutaud',
                code_postal: '13006',
                code_insee_commune: '13055',
              },
            ],
          },
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error('seeding error :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
