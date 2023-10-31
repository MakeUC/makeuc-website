/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[judgeProjectCompoundKey]` on the table `Judgement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PassportStrategyStorageStrategyNameType" AS ENUM ('google', 'microsoft');

-- AlterTable
ALTER TABLE "Judgement" ADD COLUMN     "judgeProjectCompoundKey" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "roles",
ADD COLUMN     "roles" JSONB NOT NULL DEFAULT '["default"]';

-- DropEnum
DROP TYPE "UserRoleType";

-- CreateTable
CREATE TABLE "PassportStrategyStorage" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "strategyName" "PassportStrategyStorageStrategyNameType" NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',
    "strategyNameDataCompoundKey" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PassportStrategyStorage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PassportStrategyStorage_strategyNameDataCompoundKey_key" ON "PassportStrategyStorage"("strategyNameDataCompoundKey");

-- CreateIndex
CREATE INDEX "PassportStrategyStorage_user_idx" ON "PassportStrategyStorage"("user");

-- CreateIndex
CREATE INDEX "PassportStrategyStorage_strategyName_idx" ON "PassportStrategyStorage"("strategyName");

-- CreateIndex
CREATE INDEX "PassportStrategyStorage_data_idx" ON "PassportStrategyStorage"("data");

-- CreateIndex
CREATE UNIQUE INDEX "Judgement_judgeProjectCompoundKey_key" ON "Judgement"("judgeProjectCompoundKey");

-- AddForeignKey
ALTER TABLE "PassportStrategyStorage" ADD CONSTRAINT "PassportStrategyStorage_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
