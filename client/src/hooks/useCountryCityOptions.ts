

import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";


const PAGE_SIZE = 50;


const GET_COUNTRIES = gql`
  query GetCountries {
    countries
  }
`;

const GET_CITIES = gql`
  query GetCities($countryId: Int) {
    cities(countryId: $countryId)
  }
`;


interface Country {
  id?: number;
  name: string;
  code?: string;
  iso2?: string;
}

interface City {
  id?: number;
  name: string;
}

export function useCountryCityOptions(selectedCountryId?: number) {
  const { data: countryData, loading: loadingCountries } = useQuery(GET_COUNTRIES);
  const { data: cityData, loading: loadingCities } = useQuery(GET_CITIES, {
    variables: { countryId: selectedCountryId },
    skip: !selectedCountryId,
  });

  const countries: Country[] = countryData?.countries || [];
  const cities: City[] = cityData?.cities || [];

  return {
    countries,
    cities,
    loading: loadingCountries || loadingCities,
  };
}
