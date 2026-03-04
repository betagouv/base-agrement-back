-- CreateTable
CREATE TABLE "Personne" (
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

    CONSTRAINT "Personne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgrementAssistantMaternel" (
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

    CONSTRAINT "AgrementAssistantMaternel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgrementAssistantFamilial" (
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

    CONSTRAINT "AgrementAssistantFamilial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgrementAssistantMaternel_personne_id_key" ON "AgrementAssistantMaternel"("personne_id");

-- CreateIndex
CREATE UNIQUE INDEX "AgrementAssistantFamilial_personne_id_key" ON "AgrementAssistantFamilial"("personne_id");

-- AddForeignKey
ALTER TABLE "AgrementAssistantMaternel" ADD CONSTRAINT "AgrementAssistantMaternel_personne_id_fkey" FOREIGN KEY ("personne_id") REFERENCES "Personne"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgrementAssistantFamilial" ADD CONSTRAINT "AgrementAssistantFamilial_personne_id_fkey" FOREIGN KEY ("personne_id") REFERENCES "Personne"("id") ON DELETE CASCADE ON UPDATE CASCADE;
