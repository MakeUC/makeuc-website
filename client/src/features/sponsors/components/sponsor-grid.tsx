import Image from "next/image";
import Link from "next/link";

import { sponsorData } from "../constants/sponsor-data";

import type { ImageProps } from "next/image";


export interface SponsorDetail {
  name?: string;
  imageSrc?: ImageProps["src"];
  url?: string;
}

function SponsorItem({ name, imageSrc, url }: SponsorDetail) {
  if (!imageSrc) return <></>;

  return <Link href={url ?? "#"} target="_blank"><Image alt={name ?? "Sponsor"} src={imageSrc} height={80} /></Link>;
}

export interface SponsorTier {
  name?: string;
  sponsors?: SponsorDetail[];
}

function SponsorTierRow({ name, sponsors }: SponsorTier) {
  if (!sponsors?.length) return <></>;

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-white rounded px-8 py-4 titillium-web-regular">
      {name && (
        <div className="w-full flex flex-col gap-2 titillium-web-regular">
          <h3 className="text-primary-foreground text-xl text-center tracking-wider font-semibold titillium-web-regular">{name}</h3>
          <hr className="border border-primary-foreground titillium-web-regular" />
        </div>
      )}
      {sponsors?.map(sponsor => <SponsorItem key={sponsor.name} {...sponsor} />)}
    </div>
  );
}

export interface SponsorGridProps {
  sponsorTiers: SponsorTier[];
}

export function SponsorGrid({ sponsorTiers }: SponsorGridProps) {
  return (
    <div className="flex flex-col gap-8 titillium-web-regular">
      {sponsorTiers.map(tier => <SponsorTierRow key={tier.name} {...tier} />)}
    </div>
  );
}

export function SponsorGridPlaceholder() {
  return <SponsorGrid sponsorTiers={sponsorData} />;
}