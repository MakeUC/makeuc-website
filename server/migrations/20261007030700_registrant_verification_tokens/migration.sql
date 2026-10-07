-- AlterTable
ALTER TABLE "Registrant" ADD COLUMN "verificationTokenHash" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Registrant" ADD COLUMN "verificationTokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Registrant_verificationTokenHash_idx" ON "Registrant"("verificationTokenHash");
