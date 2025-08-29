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
  if (await prisma.school.count() === 0) {
    await prisma.school.createMany({
      data: [
        ...(await getSchoolData(seenNames)),
        ...(await getSchoolIndiaData(seenNames)),
      ],
    });
  }
}

seedData();
