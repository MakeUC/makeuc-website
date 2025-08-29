-- AlterTable
ALTER TABLE "Registrant" ADD COLUMN "participationPreference" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Registrant" ADD COLUMN "tshirtSize" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Registrant" ADD COLUMN "foodSuggestions" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Registrant" ADD COLUMN "foodAllergy" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Registrant" ADD COLUMN "makeucCodeOfConduct" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Registrant" ADD COLUMN "makeucHackathonRules" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Registrant" ADD COLUMN "makeucLiabilityRelease" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Registrant" ADD COLUMN "acceptAllAuthorization" BOOLEAN NOT NULL DEFAULT false;
