/*
  Warnings:

  - You are about to drop the column `adresse_accueil_code_postal` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_accueil_complement_voie` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_accueil_numero_voie` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_lieu_accueil_code_insee_commune` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_accueil_code_postal` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_accueil_complement_voie` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_accueil_numero_voie` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `adresse_lieu_accueil_code_insee_commune` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_retrait` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `sexe` on the `personne` table. All the data in the column will be lost.
  - Added the required column `civilite` to the `personne` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agrement_assistant_familial" DROP COLUMN "adresse_accueil_code_postal",
DROP COLUMN "adresse_accueil_complement_voie",
DROP COLUMN "adresse_accueil_numero_voie",
DROP COLUMN "adresse_lieu_accueil_code_insee_commune";

-- AlterTable
ALTER TABLE "agrement_assistant_maternel" DROP COLUMN "adresse_accueil_code_postal",
DROP COLUMN "adresse_accueil_complement_voie",
DROP COLUMN "adresse_accueil_numero_voie",
DROP COLUMN "adresse_lieu_accueil_code_insee_commune",
DROP COLUMN "agrement_date_fin_retrait";

-- AlterTable
ALTER TABLE "personne" DROP COLUMN "sexe",
ADD COLUMN     "civilite" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "adresse_accueil" (
    "id" TEXT NOT NULL,
    "numero_voie" VARCHAR(10) NOT NULL,
    "complement_voie" TEXT,
    "code_postal" CHAR(5) NOT NULL,
    "code_insee_commune" TEXT NOT NULL,
    "agrement_assistant_maternel_id" TEXT,
    "agrement_assistant_familial_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adresse_accueil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adresse_accueil" ADD CONSTRAINT "adresse_accueil_agrement_assistant_maternel_id_fkey" FOREIGN KEY ("agrement_assistant_maternel_id") REFERENCES "agrement_assistant_maternel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresse_accueil" ADD CONSTRAINT "adresse_accueil_agrement_assistant_familial_id_fkey" FOREIGN KEY ("agrement_assistant_familial_id") REFERENCES "agrement_assistant_familial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
