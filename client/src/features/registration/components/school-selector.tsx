"use client";
import { useSuspenseQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";


import { Combobox } from "~/components/ui/inputs/combobox";
import { debounce } from "~/lib/lodash";

import { GetSchoolsDocument, OrderDirection, QueryMode } from "../generated/graphql/graphql";

import type { Control, Path } from "react-hook-form";


const DEFAULT_VARS = {
  orderBy: [{ name: OrderDirection.Asc }],
  skip: 0,
  take: 50,
  where: {},
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SchoolComboboxProps<ControlType extends Control<any, any>> {
  control: ControlType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: ControlType extends Control<infer P, any> ? Path<P> : never;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SchoolCombobox<ControlType extends Control<any, any>>({
  control,
  name,
}: SchoolComboboxProps<ControlType>) {
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

  return (
    <Combobox
      control={control}
      options={options}
      onSearch={onSearch}
      label="School"
      name={name}
      searchText="Search for School"
      placeholder="Enter School"
      command={{ shouldFilter: false }}
    />
  );
}