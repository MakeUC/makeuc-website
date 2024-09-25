import Image from "next/image";
import Link from "next/link";

import Logo1819 from "~/assets/1819-logo.png";
import UCIEEELogo from "~/assets/IEEE_logo.png";
import Logo2020 from "~/assets/old-logos/2020.png";
import Logo2021 from "~/assets/old-logos/2021.png";
import Logo2022 from "~/assets/old-logos/2022.png";
import Logo2023 from "~/assets/old-logos/2023.png";


export function About() {
  return (
    <>
      <p className="titillium-web-regular">
        MakeUC is a 24-hour hackathon hosted by IEEE at the University of Cincinnati.
        MakeUC was first held as a fully-online hackathon in the fall of 2020.
        We then had our first hybrid hackathon in 2021, which was a huge success!
        We have continued hosting MakeUC both in person and online every fall since then,
        and we always do our best to improve the hacker experience from year to year.
        We consistently have over two dozen amazing sponsors, hundreds of registrants,
        tens of thousands of dollars in prizes, and plenty of fun activities.
      </p>
      <p className="titillium-web-regular">
        Here, we believe that the most critical challenges must be solved by interdisciplinary and diverse teams.
        All you need to participate is a passion for technology and bettering the world.
        You will have tools, APIs, and workshops at your fingertips to help you learn and accomplish your vision.
        Whether you are an experienced hacker or a complete beginner, you are welcome at MakeUC.
        We cannot wait to see what you all create!
      </p>
      <hr className="border border-muted-foreground" />
      <p className="text-center titillium-web-bold">
        The MakeUC hackathon is brought to by
        <br />
        <Link href="https://ieee.uc.edu" target="_blank" className="text-primary">IEEE@UC</Link>
        <Link href="https://innovation.uc.edu/" target="_blank" className="text-primary">1819 Innovation Hub</Link>.
      </p>
      <div className="flex flex-col gap-8 justify-center items-center md:flex-row">
        <Link href="https://ieee.uc.edu" target="_blank" className="text-primary">
          <Image alt="IEEE@UC Logo" src={UCIEEELogo} width={300} />
        </Link>
        <Link href="https://innovation.uc.edu/" target="_blank" className="text-primary">
          <Image alt="1819 Innovation Hub Logo" src={Logo1819} width={300} />
        </Link>
      </div>
      <hr className="border border-muted-foreground" />
      <h3 className="text-2xl font-bold tracking-wider text-center titillium-web-bold">Past Hackathons</h3>
      <div className="flex flex-col md:flex-row justify-stretch gap-8 h-full titillium-web-regular">
        <Link href="https://makeuc-2020.devpost.com/" className="flex flex-col flex-1 justify-center items-center gap-4 hover:brightness-125">
          <div className="flex items-center h-full">
            <Image
              src={Logo2020}
              alt="MakeUC Logo 2020"
              width={80}
            />
          </div>
          <h4 className="text-center text-muted-foreground">Fall 2020</h4>
        </Link>
        <Link href="https://makeuc-2021.devpost.com/" className="flex flex-col flex-1 justify-center items-center gap-4 hover:brightness-125">
          <div className="flex items-center h-full">
            <Image
              src={Logo2021}
              alt="MakeUC Logo 2021"
              width={160}
            />
          </div>
          <h4 className="text-center text-muted-foreground">Fall 2021</h4>
        </Link>
        <Link href="https://makeuc-2022.devpost.com/" className="flex flex-col flex-1 justify-center items-center gap-4 hover:brightness-125">
          <div className="flex items-center h-full">
            <Image
              src={Logo2022}
              alt="MakeUC Logo 2022"
              width={160}
            />
          </div>
          <h4 className="text-center text-muted-foreground">Fall 2022</h4>
        </Link>
        <Link href="https://makeuc-2023.devpost.com/" className="flex flex-col flex-1 justify-center items-center gap-4 hover:brightness-125">
          <div className="flex items-center h-full">
            <Image
              src={Logo2023}
              alt="MakeUC Logo 2023"
              width={160}
            />
          </div>
          <h4 className="text-center text-muted-foreground">Fall 2023</h4>
        </Link>
      </div>
    </>
  );
}