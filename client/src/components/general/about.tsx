import Image from "next/image";
import Link from "next/link";

import Logo2020 from "~/assets/old-logos/2020.png";
import Logo2021 from "~/assets/old-logos/2021.png";
import Logo2022 from "~/assets/old-logos/2022.png";


export function About() {
  return (
    <>
      <p>
        MakeUC is a 24-hour hackathon hosted by IEEE at the University of Cincinnati.
        MakeUC was first held as a fully-online hackathon in the fall of 2020.
        We then had our first hybrid hackathon in 2021, which was a huge success!
        We have continued hosting MakeUC both in person and online every fall since then,
        and we always do our best to improve the hacker experience from year to year.
        We consistently have over two dozen amazing sponsors, hundreds of registrants,
        tens of thousands of dollars in prizes, and plenty of fun activities.
      </p>
      <p>
        Here, we believe that the most critical challenges must be solved by interdisciplinary and diverse teams.
        All you need to participate is a passion for technology and bettering the world.
        You will have tools, APIs, and workshops at your fingertips to help you learn and accomplish your vision.
        Whether you are an experienced hacker or a complete beginner, you are welcome at MakeUC.
        We cannot wait to see what you all create!
      </p>
      <hr className="border border-muted-foreground" />
      <h3 className="text-2xl font-bold tracking-wider text-center">Past Hackathons</h3>
      {/* <div className="grid grid-cols-[repeat(1,_1fr)] md:grid-cols-[repeat(3,_1fr)] justify-center items-center gap-8">
        <Link href="https://makeuc-2020.devpost.com/" className="grid grid-rows-[1fr,_auto] justify-center items-center h-full gap-4 hover:brightness-125">
          <Image
            src={Logo2020}
            alt="MakeUC Logo 2020"
            width={80}
          />
          <h4 className="text-center text-muted-foreground">Fall 2020</h4>
        </Link>
        <Link href="https://makeuc-2021.devpost.com/" className="grid grid-rows-[1fr,_auto] justify-center items-center h-full gap-4 hover:brightness-125">
          <Image
            src={Logo2021}
            alt="MakeUC Logo 2021"
            width={160}
          />
          <h4 className="text-center text-muted-foreground">Fall 2021</h4>
        </Link>
        <Link href="https://makeuc-2022.devpost.com/" className="grid grid-rows-[1fr,_auto] justify-center items-center h-full gap-4 hover:brightness-125">
          <Image
            src={Logo2022}
            alt="MakeUC Logo 2022"
            width={160}
          />
          <h4 className="text-center text-muted-foreground">Fall 2022</h4>
        </Link>
      </div> */}
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