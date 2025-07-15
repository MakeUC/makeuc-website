import EducationSVG from "~/assets/education.svg";
import GreenTechSVG from "~/assets/green_tech.svg";
import SecuritySVG from "~/assets/security.svg";
import SocialIssuesSVG from "~/assets/social_issues.svg";


import type { TrackCardProps } from "../components/track-card";


export const TRACKS: TrackCardProps[] = [
  {
    name: "Green Tech",
    description: "Green technology projects can be eco-friendly or implement an idea to help reduce damage to the environment.",
    svg: GreenTechSVG,
  },
  {
    name: "Education",
    description: "Education projects aim to improve the accessibility of information or upgrade students' learning experiences.",
    svg: EducationSVG,
  },
  {
    name: "Social Issues",
    description: "Social issue projects use technology to raise awareness and find solutions to issues such as discrimination.",
    svg: SocialIssuesSVG,
  },
  {
    name: "Security",
    description: "Security projects demonstrate security concerns/pitfalls, implement solutions to existing weaknesses, and more.",
    svg: SecuritySVG,
  },
];