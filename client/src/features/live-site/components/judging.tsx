"use client";
import { PageTitle } from "~/components/general/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/components/ui/table";

import type { ReactNode } from "react";


export interface JudgingInfo {
  criteria?: string;
  description?: string;
}

function createData(criteria:string, description:string) {
  return { criteria, description };
}

function DataGrid({ criteria, description }: JudgingInfo) {
  return (
    <TableRow className="border-b border-separate transition-colors bg-secondary">
      <TableCell className="text-center text-white font-semibold p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{criteria}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{description}</TableCell>
    </TableRow>
  );
}

export function DataRow({ scheduleEvent }: DataGridProps) {
  return (
    <TableBody>
      {scheduleEvent.map(value => <DataGrid key={value.criteria} {...value} />)}
    </TableBody>
  );
}

export interface DataGridProps {
  scheduleEvent: JudgingInfo[];
}

export function JudgingTable() {
  return (
    <Table className="flex flex-col sm:items-center sm:justify-evenly">
      
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium bg-primary rounded">
          <TableCell className="text-center font-semibold border-1 border-white">Criteria</TableCell>
          <TableCell className="text-center font-semibold border-1 border-white">Description</TableCell>
        </TableRow>
        <DataRow scheduleEvent={judgingData} />
      </TableBody>
    </Table>
  );
}

export const judgingData: JudgingInfo[] = [
  createData("Concept", "How unique, relevant, or impactful is the concept/theme of the project?"),
  createData("Technical Execution", "How effectively, creatively, and/or completely was the project idea developed and prototyped?"),
  createData("Technical Demonstration", "How well did the team demonstrate the success, failures, and/or limitations of their project? How well does the project solve an explained problem or accomplish a desired goal?"),
  createData("Presentation", "How well does the project submission follow directions (correct video length, provides all required information, etc)? How well did the team present their project (grammar, manners, organization, etc)?"),
];

export function Judging() {
  return (
    <>
      <ul className="list-disc text-md font-large flex flex-col gap-4 text-white leading-normal mb-6">
        <li>All judging will take place on Discord in the group to which you are assigned.</li>
        <li>Each group will have their own judging voice channel in Discord which they will use for all sessions.</li>
        <li>
          All hackers who opt into live judging will be assigned to a judging group and a judging time. <br />
          They are responsible for joining the correct channel at the correct time.
        </li>
        <li>
          Each team will have 5 minutes to present their project live. <br />
          Followed by 5 minutes of questions and answers from the judges.
        </li>
      </ul>
    </>
  );
}