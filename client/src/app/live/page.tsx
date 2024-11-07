import Image from "next/image";
import Link from "next/link";

import Logo from "~/assets/logo.png";
import { Button } from "~/components/ui/button";
import { HackerScheduleTable, WorkshopScheduleTable, TransportScheduleTable, Timer, CTFScheduleTable } from "~/features/live-site";


export const metadata = {
  title: "Live Site",
};

export default async function LiveSite() {
  return (
    <main className="sm:p-0 px-1 text-center">
      <section className="relative flex justify-center min-h-[calc(100vh-70px)]">
        <div className="flex items-center flex-col md:flex-row">
          <div className="">
            <Timer />
          </div>
          <div className="">
            <Image src={Logo} alt="MakeUC Butterfly Logo" width={400} />
          </div>
        </div>
      </section>
      <h1 className="flex items-center justify-evenly py-8 bg-muted font-bold text-3xl">Helpful Links</h1>
      <section className="flex items-center md:flex-row flex-col justify-evenly py-8 bg-muted">
        <Link href="https://discord.gg/g2T8QAhaME" className="items-center" target="_blank">
          <Button className="flex gap-2 mt-4" size="lg">Discord</Button>
        </Link>
        <Link href="https://makeuc-2024.devpost.com/" className="items-center" target="_blank">
          <Button className="flex gap-2 mt-4" size="lg">Devpost</Button>
        </Link>
        <Link href="https://youtube.com/playlist?list=PLMOg6ZY3DC6PXoZGBDCfdTYtAvl_L_4kF&feature=shared" className="items-center" target="_blank">
          <Button className="flex gap-2 mt-4" size="lg">YouTube</Button>
        </Link>
        <Link href="/resources" className="items-center">
          <Button className="flex gap-2 mt-4" size="lg">Resources</Button>
        </Link>
        <Link href="/judging" className="items-center">
          <Button className="flex gap-2 mt-4" size="lg">Judging Info</Button>
        </Link>
        <Link href="https://drive.google.com/drive/folders/1WcYK2-0QmweQIlju5xrPwiS2R2nt6M22?usp=sharing" target="_blank">
          <Button className="flex gap-2 mt-4" size="lg">Venue Maps</Button>
        </Link>
      </section>
      <h1 className="flex items-center justify-evenly py-8 font-bold text-3xl">Hacker Schedule</h1>
      <section className="py-8">
        <div className="flex-grow overflow-auto">
          <HackerScheduleTable />
        </ div>
      </section>
      <h1 className="flex items-center justify-evenly bg-muted py-8 font-bold text-3xl">CTF Schedule</h1>
      <section className="flex items-center justify-evenly py-8 bg-muted">
        <div className="flex-grow overflow-auto">
          <CTFScheduleTable />
        </ div>
      </section>
      <h1 className="flex items-center justify-evenly bg-muted py-8 font-bold text-3xl">Workshop Schedule</h1>
      <section className="flex items-center justify-evenly py-8 bg-muted">
        <div className="flex-grow overflow-auto">
          <WorkshopScheduleTable />
        </ div>
      </section>
      <h1 className="flex items-center justify-evenly bg-muted py-8 font-bold text-3xl">UC Shuttle Schedule</h1>
      <section className="flex items-center justify-evenly py-8 bg-muted">
        <div className="flex-grow overflow-x-auto">
          <TransportScheduleTable />
        </ div>
      </section>
    </main>
  );
}
