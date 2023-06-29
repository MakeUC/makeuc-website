import Image from "next/image";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import type { ImageProps } from "next/image";
import type { ReactNode } from "react";


export interface TrackCardProps {
  name: string;
  description: string;
  icon?: ReactNode;
  image?: ImageProps["src"];
}

export function TrackCard({ name, description, image, icon }: TrackCardProps) {
  return (
    <Card className="bg-background-inset w-full md:w-[330px] hover:scale-105 transition-all">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {icon}
        {image && (
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