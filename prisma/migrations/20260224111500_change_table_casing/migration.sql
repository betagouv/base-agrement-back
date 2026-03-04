/*
  Warnings:

  - You are about to drop the `AgrementAssistantFamilial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AgrementAssistantMaternel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Personne` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AgrementAssistantFamilial" DROP CONSTRAINT "AgrementAssistantFamilial_personne_id_fkey";

-- DropForeignKey
ALTER TABLE "AgrementAssistantMaternel" DROP CONSTRAINT "AgrementAssistantMaternel_personne_id_fkey";

-- DropTable
DROP TABLE "AgrementAssistantFamilial";

-- DropTable
DROP TABLE "AgrementAssistantMaternel";

-- DropTable
DROP TABLE "Personne";

-- CreateTable
CREATE TABLE "personne" (
    "id" TEXT NOT NULL,
    "sexe" TEXT NOT NULL,
    "nom_naissance" TEXT NOT NULL,
    "nom_usage" TEXT,
    "prenom_1" TEXT NOT NULL,
    "prenom_2" TEXT,
    "prenom_3" TEXT,
    "date_naissance" DATE NOT NULL,
    "lieu_naissance_pays" TEXT NOT NULL,
    "lieu_naissance_commune" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agrement_assistant_maternel" (
    "id" TEXT NOT NULL,
    "personne_id" TEXT NOT NULL,
    "adresse_accueil_numero_voie" VARCHAR(10) NOT NULL,
    "adresse_accueil_complement_voie" TEXT,
    "adresse_accueil_code_postal" CHAR(5) NOT NULL,
    "adresse_lieu_accueil_code_insee_commune" TEXT NOT NULL,
    "agrement_identifiant_departement" TEXT NOT NULL,
    "agrement_date_premiere_delivrance" DATE NOT NULL,
    "agrement_date_renouvellement" DATE,
    "agrement_date_suspension_temporaire" DATE,
    "agrement_date_fin_suspension_temporaire" DATE,
    "agrement_date_cessation_temporaire" DATE,
    "agrement_date_fin_cessation_temporaire" DATE,
    "agrement_date_retrait" DATE,
    "agrement_date_fin_retrait" DATE,
    "agrement_date_fin_definitive" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agrement_assistant_maternel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agrement_assistant_familial" (
    "id" TEXT NOT NULL,
    "personne_id" TEXT NOT NULL,
    "adresse_accueil_numero_voie" VARCHAR(10) NOT NULL,
    "adresse_accueil_complement_voie" TEXT,
    "adresse_accueil_code_postal" CHAR(5) NOT NULL,
    "adresse_lieu_accueil_code_insee_commune" TEXT NOT NULL,
    "agrement_identifiant_departement" TEXT NOT NULL,
    "agrement_date_premiere_delivrance" DATE NOT NULL,
    "agrement_date_renouvellement" DATE,
    "agrement_date_suspension_temporaire" DATE,
    "agrement_date_fin_suspension_temporaire" DATE,
    "agrement_date_cessation_temporaire" DATE,
    "agrement_date_fin_cessation_temporaire" DATE,
    "agrement_date_retrait" DATE,
    "agrement_date_fin_retrait" DATE,
    "agrement_date_fin_definitive" DATE,
    "diplome_date_obtention" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agrement_assistant_familial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agrement_assistant_maternel_personne_id_key" ON "agrement_assistant_maternel"("personne_id");

-- CreateIndex
CREATE UNIQUE INDEX "agrement_assistant_familial_personne_id_key" ON "agrement_assistant_familial"("personne_id");

-- AddForeignKey
ALTER TABLE "agrement_assistant_maternel" ADD CONSTRAINT "agrement_assistant_maternel_personne_id_fkey" FOREIGN KEY ("personne_id") REFERENCES "personne"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agrement_assistant_familial" ADD CONSTRAINT "agrement_assistant_familial_personne_id_fkey" FOREIGN KEY ("personne_id") REFERENCES "personne"("id") ON DELETE CASCADE ON UPDATE CASCADE;
