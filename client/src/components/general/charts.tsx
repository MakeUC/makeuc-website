import { Chart } from "chart.js/auto";

import type { ChartOptions, TooltipItem } from "chart.js/auto";

import "chartjs-plugin-labels";
import React, { useEffect, useRef } from "react";


// const backgroundColor = ["#8A2BE2", "#9932CC", "#BA55D3", "#DA70D6", "#FF00FF", "#FF69B4", "#FF6EB4", "#FF82AB"];
const backgroundColor = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const chartOptions: ChartOptions<"pie"> = {
  plugins: {
    tooltip: {
      titleColor: "#000",
      callbacks: {
        title: () => "",
        label: _a => {
          const a = _a as TooltipItem<"pie"> & { parsed: number };
          return `${a.label}: ${a.parsed}%`;
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

export function EthinicityChart({ ethnicities }: { ethnicities: Record<string, number> }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    const ethnicityEntries = Object.entries(ethnicities).sort((a, b) => b[1] - a[1]);

    const chart = new Chart(ctx as CanvasRenderingContext2D, {
      type: "pie",
      data: {
        labels: ethnicityEntries.map(entry => entry[0]),
        datasets: [
          {
            data: ethnicityEntries.map(entry => entry[1]),
            backgroundColor,
            borderColor: "#000",
          },
        ],
      },
      options: chartOptions,
    });

    return () => {
      console.log("Race chart created");
      chart.destroy();
    };
  }, [ethnicities]);

  return <canvas ref={chartRef} width={400} height={400} />;
}

export function EducationChart({ educationLevels }: { educationLevels: Record<string, number> }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    const eduLevels = Object.entries(educationLevels).sort((a, b) => b[1] - a[1]);

    const chart = new Chart(ctx as CanvasRenderingContext2D, {
      type: "pie",
      data: {
        labels: eduLevels.map(entry => entry[0]),
        datasets: [
          {
            label: "Ethnicity",
            data: eduLevels.map(entry => entry[1]),
            backgroundColor,
            borderColor: "#000",
          },
        ],
      },
      options: chartOptions,
    });

    return () => {
      console.log("Education chart created");
      chart.destroy();
    };
  }, [educationLevels]);

  return <canvas ref={chartRef} width={400} height={400} />;
}