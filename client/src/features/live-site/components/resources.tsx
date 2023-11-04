/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { BUILD_YOUR_OWN_RESOURCES } from "../constants/build-your-own";


export function FreeResources() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="Starter Kits">
          <AccordionTrigger value={"1"}>
            <h2 className="text-xl text-left font-semibold">Starter Kits</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h2 className="text-lg font-large">Build Your Own</h2>
            <ul className="flex flex-col gap-2 pt-4 underline text-primary">
              {BUILD_YOUR_OWN_RESOURCES.map(item => (
                <li key={item.link}><Link href={item.link}>{item.name}</Link></li>
              ))}
            </ul>
            <br />
            <h2 className="text-lg font-large">Boilerplate for Node.js Applications</h2>
            <div className="underline text-primary">
              <br />
              <Link href="https://github.com/sahat/hackathon-starter">github.com/sahat/hackathon-starter</Link>
              <br />
              <Link href="https://hackathon-starter.walcony.com/">hackathon-starter.walcony.com</Link>
            </div>
            <br />
            <p className="font-normal">
              If you have attended any hackathons in the past, then you know how much time
              it takes to get a project starteddecide on what to build, pick a programming language,
              pick a web framework, pick a styling framework. A while later, you might have an initial
              project up on GitHub and only then can other team members start contributing.
            </p>
            <p className="font-normal">
              The primary focus is on simplicity and ease of use.
              The owner of this project also tried to make it as generic and reusable as possible
              to cover most use cases of hackathon web apps, without being too specific.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Hardware">
          <AccordionTrigger value={"1"}>
            <h2 className="text-xl text-left font-semibold">Hardware</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <h3 className="text-md font-large">MakeUC isn't just software-related! Projects involving (or focusing on) hardware are more than welcomed. If you"re just getting started, or you want some inspiration, take a look at some of the resources below.</h3>
            <br />
            <Link className="underline text-primary" href="https://www.digikey.com/reference-designs/en">Digi-Key Reference Designs</Link><h3>Access schematics for hundreds of circuits that have been designed and tested to solve practical problems and reduce engineering time.</h3>
            <br />
            <Link className="underline text-primary" href="https://www.digikey.com/en/resources/online-conversion-calculators">Digi-Key Conversion Calculators</Link><h3>Online calculators for Ohm"s Law, resistor values, current dividers, and more.</h3>
            <br />
            <Link className="underline text-primary" href="https://hackaday.com/">HACKADAY</Link><h3>Blog dedicated to 'hacks' from around the world.</h3>
            <br />
            <Link className="underline text-primary" href="https://create.arduino.cc/projecthub">Arduino Project Hub</Link><h3>One-stop shop for Arduino projects.</h3>
            <br />
            <Link className="underline text-primary" href="https://www.circuitlab.com/">CircuitLab</Link><h3>Online circuit schematics and simulation.</h3>
            <br />
            <Link className="underline text-primary" href="https://www.electronics-tutorials.ws/">Electronics Tutorials</Link><h3>Hundreds of articles about circuits and components, sorted into categories for easy understanding and learning.</h3>
            <br />
            <Link className="underline text-primary" href="https://mu.microchip.com/">Microchip University</Link><h3>Tutorials on embedded system design, toolchains, programming, and more from Microchip (a leading manufacturer of microcontrollers and other electronics)..</h3>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="MOOC Platforms">
          <AccordionTrigger value={"1"}>
            <h2 className="text-xl text-left font-semibold">MOOC Platforms</h2>
          </AccordionTrigger>
          <AccordionContent className="border-b border-muted-foreground">
            <br />
            <p>A massive open online course (MOOC) is an online course aimed at unlimited participation
              and open access via the web. In addition to traditional course materials, such as filmed lectures,
              readings, and problem sets, many MOOCs provide interactive courses with user forums or
              social media discussions to support community interactions among students, professors,
              and teaching assistants (TAs), as well as immediate feedback to quick quizzes and assignments.</p>
            <p>MOOCs are great for learning. However, be careful to not submit code from the tutorials/courses.
              MOOCs should be used solely for learning.</p>
            <br />
            <Link className="underline text-primary" href="https://www.coursera.org/">Coursera</Link><h3>You can learn something new anytime, anywhere. Hundreds of free courses give you access to on-demand video lectures, homework exercises, and community discussion forums. Paid courses provide additional quizzes and projects as well as a shareable Course Certificate upon completion.</h3>
            <br />
            <Link className="underline text-primary" href="https://www.edx.org/">edX</Link><h3>Supporting learners at every stage, whether entering the job market, changing fields, seeking a promotion or exploring new interests, edX delivers courses for curious minds on topics ranging from data and computer science to leadership and communications.</h3>
            <br />
            <Link className="underline text-primary" href="https://www.udemy.com/">Udemy</Link><h3>Udemy is the leading global marketplace for teaching and learning, connecting millions of students to the skills they need to succeed. By connecting students all over the world to the best instructors, Udemy is helping individuals reach their goals and pursue their dreams.</h3>
            <br />
            <Link className="underline text-primary" href="https://www.lynda.com/">Lynda/LinkedIn Learning</Link><h3>Lynda.com is a leading online learning platform that helps anyone learn business, software, technology and creative skills to achieve personal and professional goals. Through individual, corporate, academic and government subscriptions, members have access to the Lynda.com video library of engaging, top-quality courses.</h3>
            <br />
            <Link className="underline text-primary" href="https://aws.amazon.com/training/">Amazon AWS Training</Link><h3>AWS Training and Certification helps you build and validate your cloud skills so you can get more out of the cloud. Our content is built by experts at AWS and updated regularly to keep pace with AWS updates, so you can be sure you’re learning the latest and keeping your cloud skills fresh.</h3>
            <br />
            <Link className="underline text-primary" href="https://docs.microsoft.com/en-us/learn/">Microsoft Learn</Link><h3>Microsoft Learn is a free, online training platform that provides interactive learning for Microsoft products and more. Our goal is to help you become proficient on our technologies and learn more skills with fun, guided, hands-on, interactive content that"s specific to your role and goals.</h3>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
