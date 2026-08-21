import Image from "next/image";
import Link from "next/link";


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import type { ImageProps } from "next/image";
import type { ReactNode } from "react";


export interface TrackCardProps {
  name: string;
  description: string | string[];
  icon?: ReactNode;
  image?: ImageProps["src"];
  svg?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  svgViewBox?: string;
  pastYearsDevpostUrl?: string;
}

export function TrackCard({
  name,
  description,
  image,
  icon,
  svg: Svg,
  svgViewBox,
  pastYearsDevpostUrl,
}: TrackCardProps) {
  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <CardDescription>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {description.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </CardDescription>
      );
    }

    return <CardDescription>{description}</CardDescription>;
  };

  return (
    <Card className="bg-background-inset w-full md:w-[340px] hover:scale-105 transition-all">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>{name}</CardTitle>
        {renderDescription()}
      </CardHeader>
      <CardContent className="flex justify-center">
        {icon}
        {Svg ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 350, width: 350 }}>
            {/*
              Prefer explicit svgViewBox from data. Fallback to name-based heuristics.
              Education & Social Issues: viewBox 2048x2048
              Green Tech & Security: viewBox 460x460
            */}
            <Svg
              style={{ height: "100%", width: "100%", objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
              viewBox={
                svgViewBox
                  ? svgViewBox
                  : name === "Hardware"
                    ? "187 18 422 422"
                    : name === "Green Tech" || name === "Security"
                      ? "0 0 460 460"
                      : name === "Education" || name === "Social Issues"
                        ? "0 0 2048 2048"
                        : undefined
              }
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
        ) : image && (
          <Image
            src={image}
            alt={`${name} Track Image`}
            height={280}
            width={280}
          />
        )}
      </CardContent>
      {pastYearsDevpostUrl && (
        <CardFooter>
          <Link
            href={pastYearsDevpostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary"
          >
            View past years on Devpost
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}