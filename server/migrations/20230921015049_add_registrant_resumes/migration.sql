/*
  Warnings:

  - You are about to drop the column `resumeUrl` on the `Registrant` table. All the data in the column will be lost.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- AlterTable
ALTER TABLE "Registrant" DROP COLUMN "resumeUrl",
ADD COLUMN     "resume_filename" TEXT,
ADD COLUMN     "resume_filesize" INTEGER;
