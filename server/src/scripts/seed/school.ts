const CANT_FIND_SCHOOL_OPTION = {
  "name": "Can't find my school",
  "country": "",
  "state-province": "",
};
const FAILED = Symbol("FAILED");

export async function getSchoolData(seenNames: Set<string>) {
  const combinedData = [CANT_FIND_SCHOOL_OPTION]; // always include this as a default option
  for (let i = 1; i < 2; i++) {
    const data = await import(`../../../data/universities-${i}.json`)
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(err);
        return FAILED;
      }
      );
    if (typeof data === "symbol") {
      return [];
    }
    combinedData.push(...data.default);
  }

  return combinedData
    .filter(school => {
      if (seenNames.has(school.name)) return false;
      seenNames.add(school.name);
      return true;
    })
    .map(
      school => ({
        name: school.name,
        city: "",
        state: school["state-province"] ?? "",
        county: "",
        country: school.country,
        alias: "",
      })
    );
}