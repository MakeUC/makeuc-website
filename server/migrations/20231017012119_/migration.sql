-- CreateTable
CREATE TABLE "CachedStatistic" (
    "id" TEXT NOT NULL,
    "numberOfProject" INTEGER NOT NULL,
    "linkToAllProjects" TEXT NOT NULL DEFAULT '',
    "year" INTEGER NOT NULL,

    CONSTRAINT "CachedStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CachedStatistic_year_key" ON "CachedStatistic"("year");
