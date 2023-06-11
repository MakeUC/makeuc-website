"use client";
import { useSuspenseQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";

import { Combobox } from "~/components/ui/inputs/combobox";
import { debounce } from "~/lib/lodash";

import { GetSchoolsDocument, OrderDirection, QueryMode } from "../generated/graphql/graphql";


const DEFAULT_VARS = {
  orderBy: [{ name: OrderDirection.Asc }],
  skip: 0,
  take: 50,
  where: {},
};

export function SchoolCombobox() {
  const { data, refetch } = useSuspenseQuery(GetSchoolsDocument, {
    variables: DEFAULT_VARS,
  });

  const options = data.schools?.map(school => ({ key: school.id, label: school.name ?? "Unknown School", value: school.id }));

  const onSearchDebounce = useMemo(() => debounce(refetch), [refetch]);

  const onSearch = useCallback(async (search: string) => {
    await onSearchDebounce({
      ...DEFAULT_VARS,
      where: {
        name: {
          contains: search,
          mode: QueryMode.Insensitive,
        },
      },
    });
  }, [onSearchDebounce]);

  return <Combobox options={options} onSearch={onSearch} label="School" name="school" searchText="Search for School" placeholder="Enter School" command={{ shouldFilter: false }} />;
}