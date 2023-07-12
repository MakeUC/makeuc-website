"use client";
import { useQuery } from "@apollo/client";
import { Loader } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";

import { GetStatisticsDocument } from "~/generated/graphql/graphql";

import { EducationChart, EthinicityChart } from "./charts";


export const statistics = z.object({
  countRegistrants: z.number(),
  femalePercent: z.number(),
  countSchoolsRepresented: z.number(),
  countCountriesRepresented: z.number(),
  ethnicityBreakdown: z.record(z.number()),
  educationBreakdown: z.record(z.number()),
});

export type Statistics = z.infer<typeof statistics>;

export function Stats() {
  const [isCanvasVisible, setCanvasVisible] = useState(true);
  const handleToggle = () => { setCanvasVisible(!isCanvasVisible); };

  const { data: statisticsData, loading, error } = useQuery(GetStatisticsDocument, {
    variables: { year: new Date().getFullYear() - 1 },
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

  if (loading || error || !statisticsJson) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="m-auto p-6">
      {/* <!-- Total registration value --> */}
      <div className="relative w-11/12 max-w-[1080px] mx-auto p-4">
        <h3 className="text-center text-3xl leading-[1.2] hidden md:block">Total Registration: {statisticsJson.countRegistrants}</h3>
      </div>

      {/* <!-- Values --> */}
      <div className="w-[95%] flex mx-auto rounded-md relative py-10 justify-between">
        <h3 className="text-2xl text-center">{statisticsJson.femalePercent.toFixed(2)}% Female Attendance</h3>
        <h3 className="text-2xl text-center">{statisticsJson.countSchoolsRepresented} Schools Represented</h3>
        <h3 className="text-2xl text-center">{statisticsJson.countCountriesRepresented} Countries Represented</h3>
      </div>

      <div className=" m-auto w-full flex flex-col p-5 justify-center">
        <div id="content" className="flex flex-wrap justify-between">

          <div className="w-[45%] p-7 px-0 flex flex-col mx-3 justify-center">
            <h3 className="text-3xl leading-10 text-center pb-4">Ethnicities</h3>

            <div className="h-80 py-4 flex justify-center">
              {isCanvasVisible ? (
                <EthinicityChart ethnicities={statisticsJson.ethnicityBreakdown} />
              ) : (
                <ul className="px-5 py-3 text-center">
                  {Object.entries(statisticsJson.ethnicityBreakdown).map(([ethnicity, value], index) => (
                    <li key={index} className="text-xl leading-10">{ethnicity}: {(value * 100).toFixed(2)}%</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="w-[45%] p-7 px-0 flex flex-col mx-3">
            {/* <!-- title --> */}
            <h3 className="text-3xl leading-10 text-center pb-4">Education Level</h3>
            <div className="h-80 py-4 flex justify-center">
              {isCanvasVisible ? (
                <EducationChart educationLevels={statisticsJson.educationBreakdown} />
              ) : (
                <ul className="px-5 py-3 text-center">
                  {Object.entries(statisticsJson.educationBreakdown).map(([ethnicity, value], index) => (
                    <li key={index} className="text-xl leading-10">{ethnicity}: {(value * 100).toFixed(2)}%</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
        <div className="flex justify-center"><button onClick={handleToggle} className="bg-primary text-primary-foreground font-bold py-2 px-4 w-[25%] rounded-md border">
          {isCanvasVisible ? "Show List" : "Show Canvas"}
        </button></div>
      </div>

    </div>);
}