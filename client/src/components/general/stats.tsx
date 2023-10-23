"use client";

import { useSuspenseQuery } from "@apollo/client";
import { Loader } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";

import { GetStatisticsDocument } from "~/generated/graphql/graphql";

import { Button } from "../ui/button";

import { Chart } from "./chart";


export const cachedStatistics = z.object({
  number_of_project: z.number(),
  link_to_all_projects: z.string(),
  year: z.number(),
});

export type CachedStatistics = z.infer<typeof cachedStatistics>;

export interface CachedStatsProps {
  year: number;
}

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
  const { data: statisticsData , error } = useSuspenseQuery(GetStatisticsDocument, {
    variables: { year },
  });

  const statisticsJson = useMemo(() => {
    if (!statisticsData?.statistics || !statisticsData?.cachedStatistics) {
      return undefined;
    }
  
    // Parse the main statistics data
    const parsedStatistics = statistics.safeParse(JSON.parse(statisticsData.statistics));
  
    if (!parsedStatistics.success) {
      // eslint-disable-next-line no-console
      return undefined;
    }
    
    // The cachedStatistics
    const parsedCachedStatistics = statisticsData?.cachedStatistics["0"];
  
  
    // If both data pieces are successfully parsed, merge them
    const mergedData = {
      ...parsedStatistics.data,        
      ...parsedCachedStatistics, 
    };
  
    return mergedData;
  }, [statisticsData]); 


  if (error || !statisticsJson) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="p-6">
      <div className="flex my-8 flex-row text-center justify-center gap-[3rem]">

      </div>
      <div className="flex flex-row text-center justify-center gap-[3rem]">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-4xl font-semibold">{statisticsJson.countRegistrants}</span>
          <h3 className="text-lg text-muted-foreground">Total Registrants</h3>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <span className="text-4xl font-semibold">{statisticsJson?.numberOfProject || 0}</span>
          <h3 className="text-lg text-muted-foreground">Total Projects</h3>
        </div>
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
      <div className="flex my-10 flex-row justify-center">
        <Button className="flex gap-2 mt-4" size="lg">
          <a href={statisticsJson?.linkToAllProjects || ""}>
            Links to All Projects
          </a>
        </Button>
      </div>
    </div>);
}