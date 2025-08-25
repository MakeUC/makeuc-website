import * as fs from "fs";


export interface GeographyState {
  countries: Map<number, Country>;
}

export interface CountryBase {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  hasStates: boolean;
}
export type CountryWithStates = CountryBase & {
  hasStates: true;
  states: Map<number, State>;
};
export type CountryWithoutStates = CountryBase & {
  hasStates: false;
  cities: Map<number, City>;
};
export type Country = CountryWithStates | CountryWithoutStates;

export interface StateBase {
  id: number;
  name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  hasCities: boolean;
}
export type StateWithCities = StateBase & {
  hasCities: true;
  cities?: Map<number, City>;
};
export type StateWithoutCities = StateBase & {
  hasCities: false;
  cities?: undefined;
};
export type State = StateWithCities | StateWithoutCities;

export interface City {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

// The objects in the JSON files
interface RawStates {
  id: number; // country id
  states: State[];
}
interface RawCities {
  id: number; // country id
  states?: {
    id: number; // state id
    cities: City[]
  }[];
  cities?: City[];
}

// Helper function to read file with proper typing
export function readFile<T>(path: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      const jsonData = JSON.parse(data) as unknown;
      if (err) reject(err);
      else resolve(jsonData as T[]);
    });
  });
}

// Helper function to normalize array data
export const normalizeArray = <T extends unknown[] | { data: unknown[] }>(
  data: T
): unknown[] => {
  if (Array.isArray(data)) return data;
  return data?.data || [];
};

// Initialize the in-memory state for countries, states, and cities
export const initializeGeographyState = async (): Promise<GeographyState | null> => {
  try {
    // Load all data first
    const [countriesData, rawStatesData, rawCitiesData] = await Promise.all([
      readFile<Country>("data/countriesminified.json"),
      readFile<RawStates>("data/statesminified.json"),
      readFile<RawCities>("data/citiesminified.json"),
    ]);

    // Create country map with nested structures
    const countries = new Map<number, Country>();

    // First pass: Initialize countries
    for (const country of countriesData) {
      countries.set(country.id, {
        ...country,
        states: country.hasStates ? new Map<number, State>() : undefined,
      });
    }

    // Second pass: Link states to countries
    for (const rawState of rawStatesData) {
      const country = countries.get(rawState.id);
      if (country?.hasStates && country.states) {
        const states = rawState.states;
        for (const state of states) {
          country.states.set(
            state.id,
            state.hasCities
              ? { ...state, cities: new Map<number, City>() }
              : { ...state }
          );
        }
      }
    }

    // Third pass: Link cities to states
    for (const rawCity of rawCitiesData) {
      const country = countries.get(rawCity.id);
      if (!country) continue;
      const cities = rawCity.cities;
      if (country.hasStates) { // countries with states
        for (const stateData of rawCity.states || []) {
          const state = country.states.get(stateData.id);
          if (state?.hasCities && state.cities) {
            for (const city of stateData.cities) {
              state.cities.set(city.id, city);
            }
          }
        }
      }
      else { // countries without states
        for (const city of cities || []) {
          country.cities.set(city.id, city);
        }
      }
    }

    return {
      countries,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error initializing state:", error);
    return null;
  }
};

// Initialize the state
const stateHolder: { state: GeographyState | null } = { state: null };

// Initialize on server startup
initializeGeographyState().then(result => {
  stateHolder.state = result;
});

// Export a getter for the state for external use
export const getGeographyState = () => stateHolder.state;