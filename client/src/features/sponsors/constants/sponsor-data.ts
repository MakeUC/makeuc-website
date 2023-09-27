import AxureImage from "../assets/axure.png";
import BalsamiqImage from "../assets/balsamiq.png";
import elevanceHealthImage from "../assets/elevance.svg";
import GoogleCloudImage from "../assets/google-cloud.svg";
import IBMImage from "../assets/ibm.svg";
import InfineraImage from "../assets/infinera.png";
import northropGrummanImage from "../assets/northrop_grumman.png";
import OverleafImage from "../assets/overleaf.png";
import PinnacleImage from "../assets/pinnacle.svg";
import PRHIImage from "../assets/prhi.png";
import StickerMuleImage from "../assets/sticker-mule.png";
import TaskadeImage from "../assets/taskade.png";
import WolframAlphaImage from "../assets/wolfram-alpha.png";
import XYZImage from "../assets/xyz.png";

import type { SponsorTier } from "../components/sponsor-grid";


export const sponsorData: SponsorTier[] = [
  {
    name: "Adonis",
    sponsors: [
      {
        name: "IBM",
        url: "https://www.ibm.com/us-en",
        imageSrc: IBMImage,
      },
      {
        name: "Elevance Health",
        url: "https://www.elevancehealth.com/",
        imageSrc: elevanceHealthImage,
      },
    ],
  },
  {
    name: "Swallowtail",
    sponsors: [],
  },
  {
    name: "Birdwing",
    sponsors: [
      {
        name: "PRHI",
        url: "https://www.patientsafetytech.com/",
        imageSrc: PRHIImage,
      },
    ],
  },
  {
    name: "Morpho",
    sponsors: [
      {
        name: "Infinera",
        url: "https://www.infinera.com/",
        imageSrc: InfineraImage,
      },
      {
        name: "Overleaf",
        url: "https://www.overleaf.com/",
        imageSrc: OverleafImage,
      },
      {
        name: "Northrop Grumman",
        url: "https://www.northropgrumman.com/careers/",
        imageSrc: northropGrummanImage,
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
      {
        name: "Google Cloud",
        url: "https://cloud.google.com/",
        imageSrc: GoogleCloudImage,
      },
      {
        name: "Pinnacle",
        url: "https://pinnacle.us.org/",
        imageSrc: PinnacleImage,
      },
    ],
  },
];
