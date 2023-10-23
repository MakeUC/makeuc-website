"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/components/ui/table";


export interface EventInfo {
  name?: string;
  location?: string;
  location_virt?: string;
  start?: string;
  end?: string;
}

function createData(name: string, location: string, location_virt: string, start: string, end: string) {
  return { name, location, location_virt, start, end };
}

export const scheduleData: EventInfo[] = [
  createData("Check-In", "First Floor Main Desk", "Discord #verification Channel", "Nov 4 - 09:00 AM", "Nov 4 - 10:30 AM"),
  createData("Sponsor Expo", "Second Floor Common Area", "Discord Sponsor Channels", "Nov 4 - 09:00 AM", "Nov 4 - 10:30 AM"),
  createData("Opening Ceremony", "Room 230", "YouTube Stream", "Nov 4 - 10:30 AM", "Nov 4 - 11:15 AM"),
  createData("Lunch", "Second Floor Common Area", "N/A", "Nov 4 - 11:15 AM", "Nov 4 - 12:00 PM"),
  createData("Hacking Begins", "-", "-", "Nov 4 - 11:15 AM", "Nov 5 - 11:30 AM"),
  createData("Hackathon 101", "Second Floor Common Area", "Teams Meeting", "Nov 4 - 01:00 PM", "Nov 4 - 01:30 PM"),
  createData("Team Formation", "Second Floor Common Area", "Teams Meeting", "Nov 4 - 01:30 PM", "Nov 4 - 02:00 PM"),
  createData("Workshops (see below)","Esports Lab", "Teams Meeting", "Nov 4 - 02:00 PM", "Nov 4 - 05:00 PM"),  
  createData("Dinner", "Second Floor Common Area", "N/A", "Nov 4 - 06:00 PM", "Nov 4 - 06:30 PM"),
  createData("Super Smash Bros Tournament", "Esports Lab", "N/A", "Nov 4 - 07:00 PM", "Nov 4 - 08:00 PM"),
  createData("MLH Bob Ross Contest", "Esports Lab", "Discord #mlh activites Channel", "Nov 4 - 08:00 PM", "Nov 4 - 09:00 PM"),
  createData("Midnight Snack", "Second Floor Common Area", "N/A", "Nov 5 - 12:00 AM", "Nov 5 - 12:30 AM"),
  createData("Board Games/Jackbox Games", "Second Floor Common Area", "Discord #game-room-1-vc Channel", "Nov 5 - 01:00 AM", "Nov 5 - 02:00 PM"),
  createData("Sim Racing", "Second Floor Common Area", "N/A", "Nov 5 - 04:00 AM", "Nov 5 - 05:00 AM"),
  createData("Stretching", "Common Area", "N/A", "Nov 5 - 05:00 AM", "Nov 5 - 05:30 AM"),
  createData("Breakfast", "Second Floor Common Area", "N/A", "Nov 5 - 09:00 AM", "Nov 5 - 10:00 AM"),
  createData("Hacking Ends", "-", "-", "-", "Nov 5 - 11:30 AM"),
  createData("Live Judging", "Assigned Discord Channel", "Assigned Discord Channel", "Nov 5 - 12:00 PM", "Nov 5 - 03:00 PM"),
  createData("Closing Ceremony", "Room 230", "YouTube Stream", "Nov 5 - 05:00 PM", "Nov 5 - 06:00 PM"),
];

export const workshopData: EventInfo[] = [
  createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 02:00 PM", "Nov 4 - 03:00 PM"),
  createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 03:00 PM", "Nov 4 - 04:00 PM"),
  createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 04:00 PM", "Nov 4 - 05:00 PM"),
];

function ScheduleGrid({ name, location, location_virt, start, end }: EventInfo) {
  return (
    <TableRow className="border-b border-separate transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{name}</TableCell>
      <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{location}</TableCell>
      <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{location_virt}</TableCell>
      <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{start}</TableCell>
      <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{end}</TableCell>
    </TableRow>
  );
}

export function ScheduleRow({ scheduleEvent }: ScheduleGridProps) {
  return(
    <TableBody>
      {scheduleEvent.map(value => <ScheduleGrid key={value.name} {...value}/> )}
    </TableBody>
  );
}

export interface ScheduleGridProps {
  scheduleEvent: EventInfo[];
}

export function HackerScheduleTable() {
  return (
    <Table className="flex items-center justify-evenly border-20-red">
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
          <TableCell className="text-center font-semibold">Event</TableCell>
          <TableCell className="text-center font-semibold">In-Person Location</TableCell>
          <TableCell className="text-center font-semibold">Virtual Location</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={scheduleData}/>
      </TableBody>
    </Table>
  );
} 

export function WorkshopScheduleTable() {
  return (
    <Table className="flex items-center justify-evenly">
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
          <TableCell className="text-center font-semibold">Event</TableCell>
          <TableCell className="text-center font-semibold">In-Person Location</TableCell>
          <TableCell className="text-center font-semibold">Virtual Location</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={workshopData}/>
      </TableBody>
    </Table>
  );
} 