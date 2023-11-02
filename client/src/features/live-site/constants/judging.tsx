import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";


export function Judging() {
  return (
    <>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="Basics">
          <AccordionTrigger value={"1"}>
            <h2 className="text-xl text-left font-semibold">Basics</h2>
          </AccordionTrigger>
          <AccordionContent className="bg-muted">
            <h3 className="text-md font-large">
              <br />
              - All judging will take place on Discord in the group to which you are assigned.
              <br />
              - Each group will have their own judging voice channel in Discord which they will use for all sessions.
              <br />
              - All hackers who opt into live judging will be assigned to a judging group and a judging time. 
              They are responsible for joining the correct channel at the correct time.
              <br />
              - Each team will have 5 minutes to present their project live. 
              Followed by 5 minutes of questions and answers from the judges.
            </h3>

          </AccordionContent>

        </AccordionItem>
        <AccordionItem value="Basics">
          <AccordionTrigger value={"1"}>
            <h2 className="text-xl text-left font-semibold">Timing</h2>
          </AccordionTrigger>
          <AccordionContent className="bg-muted">
            <h3 className="text-md font-large">
              <br />
              - All judging will take place on Discord in the group to which you are assigned.
              <br />
              - Each group will have their own judging voice channel in Discord which they will use for all sessions.
              <br />
              - All hackers who opt into live judging will be assigned to a judging group and a judging time. 
              They are responsible for joining the correct channel at the correct time.
              <br />
              - Each team will have 5 minutes to present their project live. 
              Followed by 5 minutes of questions and answers from the judges.
            </h3>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}