import Link from "next/link";

import { SponsorImage } from "~/components/ui/sponsor-image";

import { sponsorData } from "../constants/sponsor-data";

import type { ImageProps } from "next/image";


export interface SponsorDetail {
  name?: string;
  imageSrc?: ImageProps["src"];
  url?: string;
}

function SponsorItem({ name, imageSrc, url }: SponsorDetail) {
  if (!imageSrc) return <></>;

  const sponsorHeight = 80; // Common height for all sponsor logos

  return (
    <Link href={url ?? "#"} target="_blank" className="px-2">
      <SponsorImage 
        alt={name ?? "Sponsor"} 
        src={imageSrc} 
        height={sponsorHeight}
      />
    </Link>
  );
}

export interface SponsorTier {
  name?: string;
  sponsors?: SponsorDetail[];
}

function SponsorTierRow({ name, sponsors }: SponsorTier) {
  if (!sponsors?.length) return <></>;

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-white rounded px-8 py-4">
      {name && (
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-primary-foreground text-xl text-center tracking-wider font-semibold">{name}</h3>
          <hr className="border border-primary-foreground" />
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
    <div className="flex flex-col gap-8">
      {sponsorTiers.map(tier => <SponsorTierRow key={tier.name} {...tier} />)}
    </div>
  );
}

export function SponsorGridPlaceholder() {
  return <SponsorGrid sponsorTiers={sponsorData} />;
}