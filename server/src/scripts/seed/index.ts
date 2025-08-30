import { PrismaClient } from "@prisma/client";

import { getSchoolData } from "./school";
import { getSchoolIndiaData } from "./schoolIndia";


export const prisma = new PrismaClient({
  datasources: {
    postgresql: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url: process.env.POSTGRES_PRISMA_URL!,
    },
  },
});

const seenNames = new Set<string>();

async function seedData() {
  const schools = [
    ...(await getSchoolData(seenNames)),
    ...(await getSchoolIndiaData(seenNames)),
  ];
  await prisma.$transaction(async tx => {
    const upsertOperations = schools.map(school => {
      tx.school.upsert({
        where: { name: school.name },  // Find school by name (if it's already in db)
        create: school,                // Data to create if not found
        update: {},                    // Empty update object means keep existing data
      });
    });
    await Promise.all(upsertOperations);
  });
}

seedData();
