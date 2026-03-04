/*
  Warnings:

  - Added the required column `nom_voie` to the `adresse_accueil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adresse_accueil" ADD COLUMN     "nom_voie" TEXT NOT NULL;
