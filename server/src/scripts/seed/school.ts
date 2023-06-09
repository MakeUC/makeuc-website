const seenNames = new Set<string>();

const FAILED = Symbol("FAILED");

export async function getSchoolData() {
  const combinedData = [];
  for (let i = 1; i < 5; i++) {
    const data = await import(`../../../data/universities-${i}.json`)
      .catch(() => FAILED);
    if (typeof data === "symbol") {
      return [];
    }
    combinedData.push(...data.default.features);
  }

  return combinedData
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
}