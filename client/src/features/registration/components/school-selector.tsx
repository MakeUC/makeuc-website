"use client";
import { useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";


import { Combobox } from "~/components/ui/inputs/combobox";
import { debounce } from "~/lib/lodash";

import { GetSchoolsDocument, OrderDirection, QueryMode } from "../generated/graphql/graphql";

import type { Control, Path, FieldValues } from "react-hook-form";


const DEFAULT_VARS = {
  orderBy: [{ name: OrderDirection.Asc }],
  skip: 0,
  take: 50,
  where: {},
};


export interface SchoolComboboxProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function SchoolCombobox<T extends FieldValues = FieldValues>({
  control,
  name,
}: SchoolComboboxProps<T>) {
  const { data, refetch, loading } = useQuery(GetSchoolsDocument, {
    variables: DEFAULT_VARS,
  });

  const options = useMemo(() => {
    const base = data?.schools?.map(school => ({ key: school.id, label: school.name ?? "Unknown School", value: school.id })) || [];
    return [
      ...base,
      {
        key: "other",
        label: "Can't find my school",
        value: "other",
      },
    ];
  }, [data]);

  const onSearchDebounce = useMemo(() => debounce(vars => refetch(vars)), [refetch]);

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
      control={control as Control<FieldValues>}
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