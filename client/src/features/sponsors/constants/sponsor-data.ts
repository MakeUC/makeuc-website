import AxureImage from "../assets/axure.png";
import BalsamiqImage from "../assets/balsamiq.png";
import InfineraImage from "../assets/infinera.png";
import StickerMuleImage from "../assets/sticker-mule.png";
import TaskadeImage from "../assets/taskade.png";
import WolframAlphaImage from "../assets/wolfram-alpha.png";
import XYZImage from "../assets/xyz.png";

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
    sponsors: [
      {
        name: "Infinera",
        url: "https://www.infinera.com/",
        imageSrc: InfineraImage,
      },
    ],
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
      {
        name: "Axure",
        url: "https://www.axure.com/",
        imageSrc: AxureImage,
      },
      {
        name: "Taskade",
        url: "http://www.taskade.com/",
        imageSrc: TaskadeImage,
      },
      {
        name: "XYZ",
        url: "https://gen.xyz/",
        imageSrc: XYZImage,
      },
      {
        name: "Balsamiq",
        url: "https://balsamiq.com/wireframes/",
        imageSrc: BalsamiqImage,
      },
    ],
  },
];