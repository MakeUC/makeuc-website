-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registrant" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "ethnicity" TEXT NOT NULL,
    "school" TEXT,
    "major" TEXT NOT NULL DEFAULT '',
    "degree" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT '',
    "expectedGraduationYear" INTEGER NOT NULL,
    "resumeUrl" TEXT NOT NULL DEFAULT '',
    "hackathonsAttended" INTEGER,
    "notes" TEXT NOT NULL DEFAULT '',
    "mlhCodeOfConductAgreement" BOOLEAN NOT NULL DEFAULT false,
    "mlhPrivacyPolicyAgreement" BOOLEAN NOT NULL DEFAULT false,
    "mlhEmailAgreement" BOOLEAN NOT NULL DEFAULT false,
    "registrationYear" INTEGER DEFAULT 2024,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "emailRegistrationYearCompoundKey" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Registrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "county" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL DEFAULT '',
    "alias" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Registrant_emailRegistrationYearCompoundKey_key" ON "Registrant"("emailRegistrationYearCompoundKey");

-- CreateIndex
CREATE INDEX "Registrant_email_idx" ON "Registrant"("email");

-- CreateIndex
CREATE INDEX "Registrant_school_idx" ON "Registrant"("school");

-- CreateIndex
CREATE INDEX "Registrant_registrationYear_idx" ON "Registrant"("registrationYear");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");

-- CreateIndex
CREATE INDEX "School_city_idx" ON "School"("city");

-- CreateIndex
CREATE INDEX "School_state_idx" ON "School"("state");

-- CreateIndex
CREATE INDEX "School_county_idx" ON "School"("county");

-- CreateIndex
CREATE INDEX "School_country_idx" ON "School"("country");

-- CreateIndex
CREATE INDEX "School_alias_idx" ON "School"("alias");

-- AddForeignKey
ALTER TABLE "Registrant" ADD CONSTRAINT "Registrant_school_fkey" FOREIGN KEY ("school") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
