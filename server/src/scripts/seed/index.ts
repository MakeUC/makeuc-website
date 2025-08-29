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

async function seedData() {
  if (await prisma.school.count() === 0) {
    // @ts-expect-error data is wrong type, TODO: fix type
    await prisma.school.createMany({ data: [...(await getSchoolData()), ...(await getSchoolIndiaData())] });
  }
}

seedData();
