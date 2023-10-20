-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('admin', 'organizer', 'judge', 'default');

-- AlterTable
ALTER TABLE "Registrant" ADD COLUMN     "acceptPhotoRelease" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "invitedInPerson" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "UserRoleType" DEFAULT 'default';

-- CreateTable
CREATE TABLE "Judgement" (
    "id" TEXT NOT NULL,
    "conceptCaliber" INTEGER NOT NULL,
    "implementationAttempt" INTEGER NOT NULL,
    "demonstrationAbility" INTEGER NOT NULL,
    "presentationProfessionalism" INTEGER NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "disqualifyReason" TEXT NOT NULL DEFAULT '',
    "disqualifiedBy" TEXT,
    "judge" TEXT,
    "project" TEXT,

    CONSTRAINT "Judgement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "judgingGroup" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Judgement_applicableTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Judgement_disqualifiedBy_idx" ON "Judgement"("disqualifiedBy");

-- CreateIndex
CREATE INDEX "Judgement_judge_idx" ON "Judgement"("judge");

-- CreateIndex
CREATE INDEX "Judgement_project_idx" ON "Judgement"("project");

-- CreateIndex
CREATE UNIQUE INDEX "Project_url_key" ON "Project"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_Judgement_applicableTracks_AB_unique" ON "_Judgement_applicableTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_Judgement_applicableTracks_B_index" ON "_Judgement_applicableTracks"("B");

-- CreateIndex
CREATE INDEX "Registrant_user_idx" ON "Registrant"("user");

-- AddForeignKey
ALTER TABLE "Judgement" ADD CONSTRAINT "Judgement_disqualifiedBy_fkey" FOREIGN KEY ("disqualifiedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judgement" ADD CONSTRAINT "Judgement_judge_fkey" FOREIGN KEY ("judge") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judgement" ADD CONSTRAINT "Judgement_project_fkey" FOREIGN KEY ("project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrant" ADD CONSTRAINT "Registrant_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Judgement_applicableTracks" ADD CONSTRAINT "_Judgement_applicableTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Judgement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Judgement_applicableTracks" ADD CONSTRAINT "_Judgement_applicableTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
