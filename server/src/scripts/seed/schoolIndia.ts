const FAILED = Symbol("FAILED");

interface IndianUniversity {
  university: string;
  college: string;
  college_type: string;
  state: string;
  district: string;
}

const seenNames = new Set<string>();

export async function getSchoolIndiaData() {
  const data = await import(`../../../data/universities-${5}.json`)
    .catch(() => FAILED);

  if (typeof data === "symbol") {
    return [];
  }

  return (data.default as IndianUniversity[])
    .filter(university => {
      if (seenNames.has(university.university)) return false;
      seenNames.add(university.university);
      return true;
    })
    .map(
      university => ({
        name: university.university.replaceAll(/\s\(Id: [A-Z0-9-]+\)/g, ""),
        city: university.district,
        state: university.state,
        county: "",
        country: "India",
        alias: "",
      })
    );
}