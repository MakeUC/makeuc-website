"use client";
import { useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";

import { Combobox } from "~/components/ui/inputs/combobox";
import { debounce } from "~/lib/lodash";

import {
  GetSchoolsDocument,
  OrderDirection,
  QueryMode,
} from "../generated/graphql/graphql";

import type { Control, FieldValues } from "react-hook-form";


const DEFAULT_VARS = {
  orderBy: [{ name: OrderDirection.Asc }],
  skip: 0,
  take: 50,
  where: {},
};

const CANT_FIND_SCHOOL_NAME = "Can't find my school";

export interface SchoolComboboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
}

export function SchoolCombobox({ control, name }: SchoolComboboxProps) {
  const { data, refetch, loading } = useQuery(GetSchoolsDocument, {
    variables: DEFAULT_VARS,
  });

  const options = useMemo(() => {
    const base =
      data?.schools
        ?.map(school => ({
          key: school.id,
          label: school.name ?? "Unknown School",
          value: school.id,
        })) || [];
    const cantFindOption = base.find(
      school => school.label === CANT_FIND_SCHOOL_NAME,
    );
    // make sure "Can't find my school" option is always at the end
    return [
      ...base.filter(option => option.label !== CANT_FIND_SCHOOL_NAME),
      ...(cantFindOption ? [cantFindOption] : []),
    ];
  }, [data]);

  const onSearchDebounce = useMemo(
    () => debounce(vars => refetch(vars)),
    [refetch],
  );

  const onSearch = useCallback(
    async (search: string) => {
      await onSearchDebounce({
        ...DEFAULT_VARS,
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              // always include "Can't find my school" option
              name: { equals: CANT_FIND_SCHOOL_NAME },
            },
          ],
        },
      });
    },
    [onSearchDebounce],
  );

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
