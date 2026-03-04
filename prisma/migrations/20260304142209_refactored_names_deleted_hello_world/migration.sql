/*
  Warnings:

  - You are about to drop the column `agrement_date_cessation_temporaire` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_cessation_temporaire` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_definitive` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_retrait` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_suspension_temporaire` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_premiere_delivrance` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_renouvellement` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_retrait` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_suspension_temporaire` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_identifiant_departement` on the `agrement_assistant_familial` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_cessation_temporaire` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_cessation_temporaire` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_definitive` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_fin_suspension_temporaire` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_premiere_delivrance` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_renouvellement` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_retrait` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_date_suspension_temporaire` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the column `agrement_identifiant_departement` on the `agrement_assistant_maternel` table. All the data in the column will be lost.
  - You are about to drop the `hello_world` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date_premiere_delivrance` to the `agrement_assistant_familial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifiant_departement` to the `agrement_assistant_familial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_premiere_delivrance` to the `agrement_assistant_maternel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifiant_departement` to the `agrement_assistant_maternel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agrement_assistant_familial" DROP COLUMN "agrement_date_cessation_temporaire",
DROP COLUMN "agrement_date_fin_cessation_temporaire",
DROP COLUMN "agrement_date_fin_definitive",
DROP COLUMN "agrement_date_fin_retrait",
DROP COLUMN "agrement_date_fin_suspension_temporaire",
DROP COLUMN "agrement_date_premiere_delivrance",
DROP COLUMN "agrement_date_renouvellement",
DROP COLUMN "agrement_date_retrait",
DROP COLUMN "agrement_date_suspension_temporaire",
DROP COLUMN "agrement_identifiant_departement",
ADD COLUMN     "date_cessation_temporaire" DATE,
ADD COLUMN     "date_fin_cessation_temporaire" DATE,
ADD COLUMN     "date_fin_definitive" DATE,
ADD COLUMN     "date_fin_suspension_temporaire" DATE,
ADD COLUMN     "date_premiere_delivrance" DATE NOT NULL,
ADD COLUMN     "date_renouvellement" DATE,
ADD COLUMN     "date_retrait" DATE,
ADD COLUMN     "date_suspension_temporaire" DATE,
ADD COLUMN     "identifiant_departement" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "agrement_assistant_maternel" DROP COLUMN "agrement_date_cessation_temporaire",
DROP COLUMN "agrement_date_fin_cessation_temporaire",
DROP COLUMN "agrement_date_fin_definitive",
DROP COLUMN "agrement_date_fin_suspension_temporaire",
DROP COLUMN "agrement_date_premiere_delivrance",
DROP COLUMN "agrement_date_renouvellement",
DROP COLUMN "agrement_date_retrait",
DROP COLUMN "agrement_date_suspension_temporaire",
DROP COLUMN "agrement_identifiant_departement",
ADD COLUMN     "date_cessation_temporaire" DATE,
ADD COLUMN     "date_fin_cessation_temporaire" DATE,
ADD COLUMN     "date_fin_definitive" DATE,
ADD COLUMN     "date_fin_suspension_temporaire" DATE,
ADD COLUMN     "date_premiere_delivrance" DATE NOT NULL,
ADD COLUMN     "date_renouvellement" DATE,
ADD COLUMN     "date_retrait" DATE,
ADD COLUMN     "date_suspension_temporaire" DATE,
ADD COLUMN     "identifiant_departement" TEXT NOT NULL;

-- DropTable
DROP TABLE "hello_world";
