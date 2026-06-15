/*
  Warnings:

  - You are about to drop the `adresse_accueil` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `numero_departemental_agrement` to the `agrement_assistant_familial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_departemental_agrement` to the `agrement_assistant_maternel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "adresse_accueil" DROP CONSTRAINT "adresse_accueil_agrement_assistant_familial_id_fkey";

-- DropForeignKey
ALTER TABLE "adresse_accueil" DROP CONSTRAINT "adresse_accueil_agrement_assistant_maternel_id_fkey";

-- AlterTable
ALTER TABLE "agrement_assistant_familial" ADD COLUMN     "adresses_accueil" JSONB[],
ADD COLUMN     "numero_departemental_agrement" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "agrement_assistant_maternel" ADD COLUMN     "adresses_accueil" JSONB[],
ADD COLUMN     "numero_departemental_agrement" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "personne" ADD COLUMN     "residence_code_insee_commune" TEXT,
ADD COLUMN     "residence_code_postal" CHAR(5),
ADD COLUMN     "residence_complement_voie" TEXT,
ADD COLUMN     "residence_nom_voie" TEXT,
ADD COLUMN     "residence_numero_voie" VARCHAR(10);

-- DropTable
DROP TABLE "adresse_accueil";
