import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";


interface FAQEntry {
  card: string;
  dropDown: string;
}

const FAQ: Array<FAQEntry> = [
  {
    card: "WHAT IS A HACKATHON",
    dropDown: "A hackathon is an event where student developers use their passion for technology to create a project in 24 hours. It is a chance to collaborate and create something unique such as an app, robot, or website! Hackers will think outside of the box and hopefully learn something new along the way in our engaging environment!",
  },
  {
    card: "WHEN IS MAKEUC?",
    dropDown: "MakeUC 2023 will start on November 4th and lasts 24 hours, ending on November 5th.",
  },
  {
    card: "WILL MAKEUC BE IN PERSON?",
    dropDown: "MakeUC 2023 will be held in person and online. In-person spots will be limited, virtual spots will be unlimited!",
  },
  {
    card: "WHO CAN ATTEND IN PERSON?",
    dropDown: "We will release more information soon about who is eligible to attend in person.",
  },
  {
    card: "HOW MUCH DOES IT COST?",
    dropDown: "Nothing! The entire event is free for any student, with development tools and prizes all included. We will be sharing free resources from our sponsors (i.e. APIs) post-registration!",
  },
  {
    card: "WHAT IF I'M NEW TO HACKATHONS?",
    dropDown: "Wonderful! MakeUC is open to all skill levels, beginners to veterans. There is nothing we love more than helping our hackers learn something new while they build something cool! We will have mentors available during the hackathon to answer any questions that you may have!",
  },
  {
    card: "HOW DO I FORM TEAMS?",
    dropDown: "Teams are formed at the event (we will be having a team formation segment), but you're free to organize before the event if all participants are registered. Team size must be between 1 and 4 people.",
  },
  {
    card: "WHAT IF I HAVE A SLOW INTERNET CONNECTION?",
    dropDown: "Plan ahead! Inform your team members about the situation and try to collaborate as much as possible. Just make sure to download all developer tools in advance!",
  },
  {
    card: "WILL I BE ABLE TO MEET SPONSORS?",
    dropDown: "Yes! Many sponsors will be giving workshops throughout the event that all hackers can attend. We will also have an in-person and virtual sponsor expo where you can interact directly with sponsor representatives.",
  },
  {
    card: "WHAT ARE HACKATHON TRACKS?",
    dropDown: "Tracks are themes or impact areas for projects meant to assist you with building your idea. You are not required to submit your hack to a track to win a prize!",
  },
];

export function Faq() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Accordion type="multiple" className="w-full">
        {FAQ.map((value, index) => {
          return (
            <AccordionItem key={index} value={value.card}>
              <AccordionTrigger value={`value-${index}`}>
                <h2 className="text-xl text-left font-semibold">
                  {value.card}
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <h3 className="text-md font-large">
                  {value.dropDown}
                </h3>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}