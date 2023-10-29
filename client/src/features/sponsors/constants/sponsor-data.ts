import AxureImage from "../assets/axure.png";
import BalsamiqImage from "../assets/balsamiq.png";
import btsImage from "../assets/bts.svg";
import cincytechImage from "../assets/cincytech.png";
import elevanceHealthImage from "../assets/elevance.svg";
import fifthThirdBankImage from "../assets/Fifth-Third-Bank.png";
import FISImage from "../assets/FIS.svg";
import GoogleCloudImage from "../assets/google-cloud.svg";
import greatAmericanInsuranceImage from "../assets/great_american_insurance.png";
import HiiImage from "../assets/hii.png";
import IBMImage from "../assets/ibm.svg";
import InfineraImage from "../assets/infinera.png";
import KaoImage from "../assets/kao.png";
import KineticVisionImage from "../assets/kinetic-vision.png";
import MicrosoftImage from "../assets/Microsoft.png";
import NorthropGrummanImage from "../assets/northrop_grumman.png";
import OverleafImage from "../assets/overleaf.png";
import PinnacleImage from "../assets/pinnacle.svg";
import PRHIImage from "../assets/prhi.png";
import StandOutStickersImage from "../assets/standout-stickers.png";
import StickerMuleImage from "../assets/sticker-mule.png";
import TaskadeImage from "../assets/taskade.png";
import temboImage from "../assets/tembo.svg";
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
        imageSrc: NorthropGrummanImage,
      },
      {
        name: "HII",
        url: "https://hii.com/",
        imageSrc: HiiImage,
      },
      {
        name: "Kinetic Vision",
        url: "https://kinetic-vision.com/",
        imageSrc: KineticVisionImage,
      },
      {
        name: "bts",
        url: "https://bts.com/company/",
        imageSrc: btsImage,
      },
      {
        name: "CincyTech",
        url: "https://www.cincytechusa.com/",
        imageSrc: cincytechImage,
      },
      {
        name: "Fifth Third Bank",
        url: "https://www.53.com/content/fifth-third/en/careers/early-careers.html",
        imageSrc: fifthThirdBankImage,
      },
      {
        name: "Great American Insurance Group",
        url: "https://www.greatamericaninsurancegroup.com/",
        imageSrc: greatAmericanInsuranceImage,
      },
      {
        name: "FIS",
        url: "https://www.fisglobal.com/en",
        imageSrc: FISImage,
      },
      {
        name: "Tembo",
        url: "https://www.tembo.eu/",
        imageSrc: temboImage,
      },
      {
        name: "Microsoft",
        url: "https://careers.microsoft.com/v2/global/en/home.html",
        imageSrc: MicrosoftImage,
      },
      {
        name: "Kao",
        url: "https://www.kao.com/global/en/",
        imageSrc: KaoImage,
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
      {
        name: "StandOut Stickers",
        url: "http://hackp.ac/mlh-StandOutStickers-hackathons",
        imageSrc: StandOutStickersImage,
      },
    ],
  },
];
