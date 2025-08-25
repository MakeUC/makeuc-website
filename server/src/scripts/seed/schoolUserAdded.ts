
import fs from "fs";
import path from "path";

import { getSchoolData } from "./school";
import { getSchoolIndiaData } from "./schoolIndia";


const DATA_PATH = path.resolve(__dirname, "../../../data/universities-6.json");

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

function readUserAddedSchools() {
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function writeUserAddedSchools(schools: any[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(schools, null, 2));
}

export async function addOrGetSchoolUserAdded(
  manualName: string,
  details: Partial<{
    city: string;
    state: string;
    county: string;
    country: string;
    alias: string;
  }>
) {
  if (!manualName || !manualName.trim()) return null;
  const normalized = normalizeName(manualName);

  // Get all existing schools (US + India + user-added)
  const [usSchools, indiaSchools] = await Promise.all([
    getSchoolData(),
    getSchoolIndiaData(),
  ]);
  const userAddedSchools = readUserAddedSchools();
  const allSchools = [
    ...usSchools,
    ...indiaSchools,
    ...userAddedSchools,
  ];

  // Check for existing (case-insensitive)
  const existing = allSchools.find(s => normalizeName(s.name) === normalized);
  if (existing) {
    return existing; // Return canonical existing value
  }

  // Add to user-added list and persist
  const newSchool = {
    name: manualName.trim(),
    city: details.city || "",
    state: details.state || "",
    county: details.county || "",
    country: details.country || "",
    alias: details.alias || "",
  };
  userAddedSchools.push(newSchool);
  writeUserAddedSchools(userAddedSchools);
  return newSchool;
}

export function getUserAddedSchools() {
  return readUserAddedSchools();
}
