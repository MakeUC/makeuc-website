"use client";
import { useState } from "react";

import { EducationChart, EthinicityChart } from "./charts";


export function Stats() {
  const [isCanvasVisible, setCanvasVisible] = useState(true);
  const handleToggle = () => { setCanvasVisible(!isCanvasVisible); };

  const statsdict = {
    countRegistrants: 100,
    femalePercent: 40,
    countSchoolsRepresented: 200,
    countCountriesRepresented: 20,
    ethnicitiyBreakdown: {
      "Asian": 5,
      "White": 10,
      "Black or African American": 20,
      "Hispanic or Latino": 15,
      "Prefer not to answer": 50,
    },
    educationBreakdown: {
      "Bachelor's": 5,
      "Master's": 10,
      "Associate's": 20,
      "Doctorate": 15,
      "High School": 50,
    },
  };
  return (
    <div className="m-auto p-6">
      {/* <!-- Total registration value --> */}
      <div className="relative w-11/12 max-w-[1080px] mx-auto p-4">
        <h3 className="text-center text-3xl leading-[1.2] hidden md:block">Total Registration: {statsdict["countRegistrants"]}</h3>
      </div>

      {/* <!-- Values --> */}
      <div className="w-[95%] flex mx-auto rounded-md relative py-10 justify-between">
        <h3 className="text-2xl text-center">{statsdict["femalePercent"]}% Female Attendance</h3>
        <h3 className="text-2xl text-center">{statsdict["countSchoolsRepresented"]} Schools Represented</h3>
        <h3 className="text-2xl text-center">{statsdict["countCountriesRepresented"]} Countries Represented</h3>
      </div>

      <div className=" m-auto w-full flex flex-col p-5 justify-center">
        <div id="content" className="flex flex-wrap justify-between">

          <div className="w-[45%] p-7 px-0 flex flex-col mx-3 justify-center">
            <h3 className="text-3xl leading-10 text-center pb-4">Ethnicities</h3>

            <div className="h-80 py-4 flex justify-center">
              {isCanvasVisible ? (
                <EthinicityChart ethnicities={statsdict["ethnicitiyBreakdown"]} />
              ) : (
                <ul className="px-5 py-3 text-center">
                  {Object.entries(statsdict["ethnicitiyBreakdown"]).map(([ethnicity, value], index) => (
                    <li key={index} className="text-xl leading-10">{ethnicity}: {value}%</li>
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
                <EducationChart educationLevels={statsdict["educationBreakdown"]} />
              ) : (
                <ul className="px-5 py-3 text-center">
                  {Object.entries(statsdict["educationBreakdown"]).map(([ethnicity, value], index) => (
                    <li key={index} className="text-xl leading-10">{ethnicity}: {value}%</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
        <div className="flex justify-center"><button onClick={handleToggle} className="bg-[#37ace6] text-black font-bold py-2 px-4 w-[25%] rounded-md border">
          {isCanvasVisible ? "Show List" : "Show Canvas"}
        </button></div>
      </div>

    </div>);
}