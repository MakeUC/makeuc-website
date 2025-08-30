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
  const batchSize = 100;
  const schools = [
    ...(await getSchoolData(seenNames)),
    ...(await getSchoolIndiaData(seenNames)),
  ];

  // Insert schools in batches to handle our large datasets
  for (let i = 0; i < schools.length; i += batchSize) {
    const batch = schools.slice(i, i + batchSize);

    try {
      await prisma.school.createMany({
        data: batch,
        skipDuplicates: true,
      });
      // eslint-disable-next-line no-console
      console.log(`Processed ${i + batch.length} records`);
    } catch (error) {
      // Wait and retry failed batch
      await new Promise(resolve => setTimeout(resolve, 1000));
      await prisma.school.createMany({
        data: batch,
        skipDuplicates: true,
      });
    }
  }
}

seedData();
