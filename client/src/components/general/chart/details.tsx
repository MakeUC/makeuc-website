"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";


export interface ChartDetailsProps {
  data: Record<string, number | string>
}

export function ChartDetails({ data }: ChartDetailsProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!showDetails) {
    return <Button onClick={() => setShowDetails(true)}>Show Details</Button>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setShowDetails(false)}>Hide Details</Button>
      <div className="flex flex-col gap-2">
        {
          Object.entries(data)
            .map(([key, value]) => (
              <span key={key}>{key}: {value}%</span>
            ))
        }
      </div>
    </div>
  );
}