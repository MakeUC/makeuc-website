import Image from "next/image";

import Logo from "~/assets/logo.png";
import { Timer } from "~/features/live-site/components/countdown";
// import { hackerSchedule } from "~/features/live-site/components/schedule-grid";


export const metadata = {
  title: "Live Site",
};

export default async function LiveSite() {
  return (
    <main>
      <hr className="border border-muted-foreground" />
      <br />
      <div className="flex flex-1 justify-center items-center md:-translate-y-[35px]">
        <div className="flex items-center">
          <div className="flex-grow">
            <Timer />
          </div> 
          <div>
            <Image src={Logo} alt="MakeUC Butterfly Logo" width={400} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-grow">
            {/* <hackerSchedule /> */}
          </ div>
        </ div>
      </div>
    </main>
  );
}