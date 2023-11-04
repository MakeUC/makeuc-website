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
        <AccordionItem value="PRHI">
          <AccordionTrigger value={"1"}>
            <h2 className="text-xl text-left font-semibold">Pittsburgh Regional Health Initiative</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">
              The Patient Safety Technology Challenge is designed to fuel the engagement of
              students and innovators in creating solutions and envisioning transformational approaches
              to reduce preventable harm from medical errors.
            </h3>
            <br />
            <Link className="underline text-primary" href={"https://www.patientsafetytech.com/"}>Patient Safety Technology</Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Taskade">
          <AccordionTrigger value={"2"}>
            <h2 className="text-xl text-left font-semibold">Taskade</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">
              Taskade is the ultimate to-do list app for managing tasks, writing notes, and collaborating with others.
              They are offering all hackers a 100% off lifetime workspace upgrade!
            </h3>
            <br />
            <Link className="underline text-primary" href={"https://taskade.com/signup"}>Taskade SignUp</Link>
          </AccordionContent>
        </AccordionItem>
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
        </AccordionItem>
        <AccordionItem value="XYZ">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">.XYZ</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">
              .XYZ was made to help the next generation of innovators, entrepreneurs, makers,
              and creatives bring their ideas online with a memorable domain name.
            </h3>
            <br />
            <Link className="underline text-primary" href={"https://gen.xyz/blog/2020-quarterly-q1?utm_source=next-generation-support-pamphlet&utm_medium=how-to-section&utm_campaign=partnerships"}>Get your project off the ground</Link>
            <br />
            <Link className="underline text-primary" href={"https://drive.google.com/file/d/1kdGCVl5K8kwaFoLLyA_PwN3-Ll_hvHLV/view?usp=sharing"}>.XYZ Domain Usage Guide</Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Azure">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">Microsoft Azure</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">
              Create, deploy, and manage applications across multiple clouds, on-premises, and at the edge
            </h3>
            <br />
            <Link className="underline text-primary" href={"https://azure.microsoft.com/en-us/free/"}>Free Azure Account</Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Google Cloud">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">Google Cloud</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">
              Google Cloud credits - $25 for each participant
              <br/>
              Redemption code: MakeUC23
            </h3>
            <br />
            <Link className="underline text-primary" href={"goo.gle/googlecloudcredits"}>Google Cloud Credits</Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="IBM">
          <AccordionTrigger value={"value"}>
            <h2 className="text-xl text-left font-semibold">IBM </h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <Link className="underline text-primary" href={"https://github.com/academic-initiative/documentation/blob/main/academic-initiative/how-to/How-to-create-an-IBM-Cloud-account/readme.md"}>IBM Cloud Account</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
