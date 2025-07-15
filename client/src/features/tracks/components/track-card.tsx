import Image from "next/image";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import type { ImageProps } from "next/image";
import type { ReactNode } from "react";


export interface TrackCardProps {
  name: string;
  description: string;
  icon?: ReactNode;
  image?: ImageProps["src"];
  svg?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function TrackCard({ name, description, image, icon, svg: Svg }: TrackCardProps) {
  return (
    <Card className="bg-background-inset w-full md:w-[330px] hover:scale-105 transition-all">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {icon}
        {Svg ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 280, width: 280 }}>
            {/*
              Education & Social Issues: viewBox 2048x2048
              Green Tech & Security: viewBox 460x460
            */}
            <Svg
              style={{ height: "100%", width: "100%", objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
              viewBox={
                name === "Green Tech" || name === "Security"
                  ? "0 0 460 460"
                  : name === "Education" || name === "Social Issues"
                    ? "0 0 2048 2048"
                    : undefined
              }
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
    </Card>
  );
}