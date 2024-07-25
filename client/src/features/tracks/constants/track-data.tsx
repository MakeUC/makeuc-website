import EducationImage from "../assets/education.png";
import GreenTechImage from "../assets/green_tech.png";
import SecurityImage from "../assets/security.png";
import SocialIssuesImage from "../assets/social_issues.png";


import type { TrackCardProps } from "../components/track-card";


export const TRACKS: TrackCardProps[] = [
  {
    name: "Green Tech",
    description: "Green technology projects can be eco-friendly or implement an idea to help reduce damage to the environment.",
    image: GreenTechImage,
  },
  {
    name: "Education",
    description: "Education projects aim to improve the accessibility of information or upgrade students' learning experiences.",
    image: EducationImage,
  },
  {
    name: "Social Issues",
    description: "Social issue projects use technology to raise awareness and find solutions to issues such as discrimination.",
    image: SocialIssuesImage,
  },
  {
    name: "Security",
    description: "Security projects demonstrate security concerns/pitfalls, implement solutions to existing weaknesses, and more.",
    image: SecurityImage,
  },
];