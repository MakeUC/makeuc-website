import universityData1 from "../../../data/universities-1.json";
import universityData2 from "../../../data/universities-2.json";
import universityData3 from "../../../data/universities-3.json";
import universityData4 from "../../../data/universities-4.json";

import type { Prisma } from ".prisma/client";


const seenNames = new Set<string>();

const combinedData = [
  ...universityData1.features,
  ...universityData2.features,
  ...universityData3.features,
  ...universityData4.features,
];

export const schools: Prisma.SchoolCreateArgs["data"] = combinedData
  .filter(feature => {
    if (seenNames.has(feature.attributes.NAME)) return false;
    seenNames.add(feature.attributes.NAME);
    return true;
  })
  .map(
    feature => ({
      name: feature.attributes.NAME,
      city: feature.attributes.CITY,
      state: feature.attributes.STATE,
      county: feature.attributes.COUNTY,
      country: feature.attributes.COUNTRY,
      alias: feature.attributes.ALIAS,
    })
  );