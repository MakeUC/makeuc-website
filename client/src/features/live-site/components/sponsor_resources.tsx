/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";


export function SponsorResources() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Accordion type="multiple" className="w-full">
        {/*
        <AccordionItem value="Wolfram">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">Wolfram|One</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">
              Wolfram|One is the world's first fully cloud-desktop hybrid, integrated computation platform the
              ideal entry point to using the full capabilities of the Wolfram technology stack.
            </h3>
            <br />
            <Link className="underline text-primary" href={"https://www.wolfram.com/wolfram-one/#about"}>Wolfram|One 30 Day Trial</Link>
          </AccordionContent>
        </AccordionItem> */}

        <AccordionItem value="Kinetic Vision">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">Kinetic Vision - Challenge Description</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <Link className="underline text-primary text-white" href={"https://drive.google.com/file/d/1VFs8eyWfBLTm3hR_FIzfV2V9byeIScNp/view?usp=sharing"}>Kinetic Vision's Most Innovative Use of IoT Data Challenge</Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="MLH">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">MLH - Free Resources</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <Link className="underline text-primary text-white" href={"https://hack.mlh.io/software"}>MLH Free Software Access</Link>
            <br />
            <Link className="underline text-primary text-white" href={"https://techtogether.io/"}>MLH TechTogether</Link>
            <br />
            <Link className="underline text-primary text-white" href={"https://www.mlh.com/events/prizes"}>MLH Prizes and Freebies</Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="XYZ">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">.XYZ - Free Domains</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">
              .XYZ was made to help the next generation of innovators, entrepreneurs, makers,
              and creatives bring their ideas online with a memorable domain name.
            </h3>
            <br />
            <Link className="underline text-primary text-white" href={"https://drive.google.com/file/d/1vGsKOSeREApAiggHSDr22AtHn6-P_q0w/view?usp=sharing"}>.XYZ Domain Usage Guide</Link>
          </AccordionContent>
        </AccordionItem>
        
        
        <AccordionItem value="Kloob">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">Kloob</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <Link className="underline text-primary text-white" href={"https://www.kloob.app/"}>Download kloob to participate in the attendance leaderboard!</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
