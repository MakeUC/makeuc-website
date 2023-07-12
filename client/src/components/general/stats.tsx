"use client";

import { useSuspenseQuery } from "@apollo/client";
import { Loader } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";

import { GetStatisticsDocument } from "~/generated/graphql/graphql";

import { Chart } from "./chart";


export const statistics = z.object({
  countRegistrants: z.number(),
  femalePercent: z.number(),
  countSchoolsRepresented: z.number(),
  countCountriesRepresented: z.number(),
  ethnicityBreakdown: z.record(z.number()),
  educationBreakdown: z.record(z.number()),
});

export type Statistics = z.infer<typeof statistics>;

export interface StatsProps {
  year: number;
}

export function Stats({ year }: StatsProps) {
  const { data: statisticsData, error } = useSuspenseQuery(GetStatisticsDocument, {
    variables: { year },
  });

  const statisticsJson = useMemo(() => {
    if (!statisticsData?.statistics) return undefined;

    const result = statistics.safeParse(JSON.parse(statisticsData?.statistics));

    if (!result.success) {
      // eslint-disable-next-line no-console
      console.error(result.error);
      return undefined;
    }

    return result.data;
  }, [statisticsData]);

  if (error || !statisticsJson) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-4xl font-semibold">{statisticsJson.countRegistrants}</span>
        <h3 className="text-lg text-muted-foreground">Total Registrants</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(3,_1fr)] gap-4 my-8 p-2 justify-between">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-3xl font-semibold">{statisticsJson.femalePercent.toFixed(2)}%</span>
          <h3 className="text-lg text-muted-foreground">Female Attendance</h3>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <span className="text-3xl font-semibold">{statisticsJson.countSchoolsRepresented}</span>
          <h3 className="text-lg text-muted-foreground">Schools Represented</h3>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <span className="text-3xl font-semibold">{statisticsJson.countCountriesRepresented}</span>
          <h3 className="text-lg text-muted-foreground">Countries Represented</h3>
        </div>
      </div>
      <div className="flex flex-col justify-between md:flex-row gap-8">
        <Chart data={statisticsJson.ethnicityBreakdown} title="Ethnicity" />
        <Chart data={statisticsJson.educationBreakdown} title="Education" />
      </div>
    </div>);
}