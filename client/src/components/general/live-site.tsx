import Image from "next/image";
import Link from "next/link";

import Logo1819 from "~/assets/1819-logo.png";
import Logo2020 from "~/assets/old-logos/2020.png";
import Logo2021 from "~/assets/old-logos/2021.png";
import Logo2022 from "~/assets/old-logos/2022.png";
import UCIEEELogo from "~/assets/uc-ieee-logo.png";


export function LiveSite() {
  return (
    <>
      
      <hr className="border border-muted-foreground" />
      <p className="text-center">
        The MakeUC hackathon is brought to you in partnership with
        <br />
        <Link href="https://ieee.uc.edu" target="_blank" className="text-primary">IEEE@UC</Link> and the&nbsp;
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
      <h3 className="text-2xl font-bold tracking-wider text-center">Past Hackathons</h3>
      <div className="flex flex-col md:flex-row justify-stretch gap-8 h-full">
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
      </div>
    </>
  );
}
