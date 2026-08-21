import EducationSVG from "~/assets/education.svg";
import GreenTechSVG from "~/assets/green_tech.svg";
import IcChipSVG from "~/assets/ic_chip.svg";
import SecuritySVG from "~/assets/security.svg";
import SocialIssuesSVG from "~/assets/social_issues.svg";

import type { TrackCardProps } from "../components/track-card";






export const TRACKS: TrackCardProps[] = [
  {
    name: "Hardware",
    description: [
      "Use microcontrollers, sensors, or actuators to build a prototype",
      "Integrate hardware with software (firmware, APIs, or mobile/web UIs)",
      "Address power, safety, and reliability for the device",
      "Demonstrate a working, repeatable prototype during the event",
    ],
    svg: IcChipSVG,
    svgViewBox: "0 0 1920 1080",
    pastYearsDevpostUrl: "https://makeuc-2025.devpost.com/submissions/search?utf8=%E2%9C%93&prize_filter%5Bprizes%5D%5B%5D=91986",
    // increase visual size: use a square viewbox to let the TrackCard scale the SVG larger
  },
  {
    name: "Education",
    description: [
      "Improve accessibility or inclusivity in learning",
      "Create engaging, interactive learning experiences",
      "Provide meaningful assessment or feedback mechanisms",
      "Design for scalability and real-world classroom use",
    ],
    svg: EducationSVG,
    pastYearsDevpostUrl: "https://makeuc-2025.devpost.com/submissions/search?utf8=%E2%9C%93&prize_filter%5Bprizes%5D%5B%5D=91983",
  },
  {
    name: "Social Issues",
    description: [
      "Raise awareness or empower affected communities",
      "Provide inclusive solutions with clear impact",
      "Demonstrate ethical considerations and privacy safeguards",
      "Show a plan for community adoption or outreach",
    ],
    svg: SocialIssuesSVG,
    pastYearsDevpostUrl: "https://makeuc-2025.devpost.com/submissions/search?utf8=%E2%9C%93&prize_filter%5Bprizes%5D%5B%5D=91982",
  },
  {
    name: "Security",
    description: [
      "Identify a real security problem or vulnerability",
      "Implement measures to protect user data and systems",
      "Demonstrate attack/defense scenarios and mitigations",
      "Include threat modeling and practical deployment guidance",
    ],
    svg: SecuritySVG,
    pastYearsDevpostUrl: "https://makeuc-2025.devpost.com/submissions/search?utf8=%E2%9C%93&prize_filter%5Bprizes%5D%5B%5D=91985",
  },
];