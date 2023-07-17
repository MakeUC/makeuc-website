import StickerMuleImage from "../assets/sticker-mule.png";
import WolframAlphaImage from "../assets/wolfram-alpha.png";

import type { SponsorTier } from "../components/sponsor-grid";


export const sponsorData: SponsorTier[] = [
  {
    name: "Adonis",
    sponsors: [],
  },
  {
    name: "Swallowtail",
    sponsors: [],
  },
  {
    name: "Birdwing",
    sponsors: [],
  },
  {
    name: "Morpho",
    sponsors: [],
  },
  {
    name: "Monarch",
    sponsors: [
      {
        name: "Wolfram Alpha",
        url: "https://www.wolfram.com/",
        imageSrc: WolframAlphaImage,
      },
      {
        name: "Sticker Mule",
        url: "https://mule.to/p4dy",
        imageSrc: StickerMuleImage,
      },
    ],
  },
];