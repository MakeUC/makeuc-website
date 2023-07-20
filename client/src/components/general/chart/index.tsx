import { Chart as CJSChart } from "chart.js/auto";
import { useCallback, useMemo } from "react";

import { ChartDetails } from "./details";

import type { ChartOptions, TooltipItem } from "chart.js/auto";


const backgroundColor = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const chartOptions: ChartOptions<"pie"> = {
  plugins: {
    tooltip: {
      titleColor: "#000",
      callbacks: {
        title: () => "",
        label: (option: TooltipItem<"pie"> & { parsed: number }) => {
          return `${option.label}: ${option.parsed}%`;
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

export interface ChartProps {
  data: Record<string, number>;
  title: string;
}

export function Chart({ data, title }: ChartProps) {
  const cleanedData = useMemo(() =>
    Object.fromEntries(Object.entries(data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .sort(([_, value1], [_2, value2]) => value2 - value1)
      .map(([key, value]) => [key, (value * 100).toFixed(2)]),
    ), [data]);

  const buildChart = useCallback((canvas: HTMLCanvasElement | null) => {
    const context = canvas?.getContext("2d");

    // eslint-disable-next-line no-console
    if (!context) return console.error("Missing context for a chart's canvas!");

    // Use entries so that ordering is consistent
    const entries = Object.entries(cleanedData);

    new CJSChart(context, {
      type: "pie",
      data: {
        labels: entries.map(entry => entry[0]),
        datasets: [
          {
            data: entries.map(entry => entry[1]),
            backgroundColor,
            borderColor: "#000",
          },
        ],
      },
      options: chartOptions,
    });
  }, [cleanedData]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={buildChart} height={400} width={400} />
      <h3 className="text-lg text-muted-foreground">{title}</h3>
      <ChartDetails data={cleanedData} />
    </div>
  );
}
