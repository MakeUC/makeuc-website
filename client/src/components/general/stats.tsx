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

export interface StatsProps {
  year: number;
}

export function Stats({ year }: StatsProps) {
  const { data: statisticsData, error } = useSuspenseQuery(
    GetStatisticsDocument,
    {
      variables: { year },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
    },
  );

  // Memoize the parsed result
  const statisticsJson = useMemo(() => {
    if (!statisticsData?.statistics) return undefined;
    try {
      const result = statistics.safeParse(JSON.parse(statisticsData.statistics));
      if (!result.success) {
        // eslint-disable-next-line no-console
        console.error(result.error);
        return undefined;
      }
      return result.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error parsing statistics:", error);
      return undefined;
    }
  }, [statisticsData?.statistics]);

  // Memoize charts configuration
  const charts = useMemo(() => {
    if (!statisticsJson) return [];
    return [
      { data: statisticsJson.ethnicityBreakdown, title: "Ethnicity" },
      { data: statisticsJson.educationBreakdown, title: "Education" },
    ];
  }, [statisticsJson]);

  // Handle loading and error states
  if (error || !statisticsJson) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="p-6">
      {/* Top section */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-4xl font-semibold">{statisticsJson.countRegistrants}</span>
        <h3 className="text-lg text-muted-foreground titillium-web-bold">Total Registrants</h3>
      </div>

      {/* Middle grid */}
      <div className="grid grid-cols-1 md:grid-cols-[repeat(3,_1fr)] gap-4 my-8 p-2 justify-between">
        <StatsCard value={statisticsJson.femalePercent.toFixed(2)} label="Female Attendance" />
        <StatsCard value={statisticsJson.countSchoolsRepresented} label="Schools Represented" />
        <StatsCard value={statisticsJson.countCountriesRepresented} label="Countries Represented" />
      </div>

      {/* Bottom charts section */}
      <div className="flex flex-col justify-between md:flex-row gap-8">
        {charts.map((chartConfig, index) => (
          <Chart key={`${chartConfig.title}-${index}`} {...chartConfig} />
        ))}
      </div>
    </div>
  );
}

function StatsCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col gap-2 text-center">
      <span className="text-3xl font-semibold">{value}</span>
      <h3 className="text-lg text-muted-foreground titillium-web-bold">{label}</h3>
    </div>
  );
}