// import { Leaf, Microscope, ShieldAlert, Users } from "lucide-react";

import EducationImage from "../assets/education.png";
import GreenTechImage from "../assets/green-tech.png";
import SecurityImage from "../assets/security.png";
import SocialIssuesImage from "../assets/social-issues.png";


import type { TrackCardProps } from "../components/track-card";


export const TRACKS: TrackCardProps[] = [
  {
    name: "Green Tech",
    description: "Green technology projects can be eco-friendly or implement an idea to help reduce damage to the environment.",
    image: GreenTechImage,
    // icon: <Leaf size={240} strokeWidth={1} className="text-[#5ca904]" />,
  },
  {
    name: "Education",
    description: "Education projects aim to improve the accessibility of information or upgrade students' learning experiences.",
    image: EducationImage,
    // icon: <Microscope size={240} strokeWidth={1} className="text-[#f75047]" />,
  },
  {
    name: "Social Issues",
    description: "Social issue projects use technology to raise awareness and find solutions to issues such as discrimination.",
    image: SocialIssuesImage,
    // icon: <Users size={240} strokeWidth={1} className="text-[#a44cd3]" />,
  },
  {
    name: "Security",
    description: "Security projects demonstrate security concerns/pitfalls, implement solutions to existing weaknesses, and more.",
    image: SecurityImage,
    // icon: <ShieldAlert size={240} strokeWidth={1} className="text-[#ffd700]" />,
  },
];