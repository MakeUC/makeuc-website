import Image from "next/image";
import Link from "next/link";

import Logo from "~/assets/logo.png";
import { Button } from "~/components/ui/button";
import { Timer } from "~/features/live-site/components/countdown";
import { HackerScheduleTable, WorkshopScheduleTable } from "~/features/live-site/constants/schedule";


export const metadata = {
  title: "Live Site",
};

export default async function LiveSite() {
  return (
    <main>
      <section className="relative flex justify-center min-h-[calc(100vh-70px)]">
        <div className="flex items-center">
          <div className="flex-grow">
            <Timer />
          </div> 
          <div>
            <Image src={Logo} alt="MakeUC Butterfly Logo" width={400} />
          </div>
        </div>
      </section>
      <h1 className="flex items-center justify-evenly py-8 bg-muted font-bold text-3xl">Helpful Links</h1>
      <section className="flex items-center justify-evenly py-8 bg-muted">
        <Link href="https://discord.gg/g2T8QAhaME" className="items-center">
          <Button className="flex gap-2 mt-4" size="lg">Discord</Button>
        </Link>
        <Link href="https://makeuc-2023.devpost.com/" className="items-center">
          <Button className="flex gap-2 mt-4" size="lg">Devpost</Button>
        </Link>
        <Link href="https://youtube.com/playlist?list=PLMOg6ZY3DC6PgVmJ9jsGWqQ9-hI0kAhqu&feature=shared" className="items-center">
          <Button className="flex gap-2 mt-4" size="lg">YouTube</Button>
        </Link>
      </section>
      <h1 className="flex items-center justify-evenly py-8 font-bold text-3xl">Hacker Schedule</h1>
      <section className="flex items-center justify-evenly py-8">
        <div className="flex-grow">
          <HackerScheduleTable />
        </ div>
      </section>
      <h1 className="flex items-center justify-evenly bg-muted py-8 font-bold text-3xl">Workshop Schedule</h1>
      <section className="flex items-center justify-evenly py-8 bg-muted">
        <div className="flex-grow">
          <WorkshopScheduleTable />
        </ div>
      </section>
    </main>
  );
}