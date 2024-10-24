"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/components/ui/table";

import type { ReactNode } from "react";



export interface EventInfo {
  name?: string;
  location?: string;
  location_virt?: ReactNode;
  start?: string;
  end?: string;
}

function createData(name: string, location: string, location_virt: ReactNode, start: string, end: string) {
  return { name, location, location_virt, start, end };
}

export const scheduleData: EventInfo[] = [
  createData("Check-In", "First Floor Main Desk", "Discord #verification Channel", "Nov 4 - 09:00 AM", "Nov 4 - 10:30 AM"),
  createData("Sponsor Expo", "Second Floor Common Area", "Discord Sponsor VC", "Nov 9 - 10:00 AM", "Nov 9 - 12:30 AM"),
  createData("Opening Ceremony", "Room 230", "YouTube Stream", "Nov 9 - 11:00 AM", "Nov 9 - 11:45 AM"),
  createData("Lunch", "Second Floor Common Area", "-", "Nov 9 - 12:00 AM", "Nov 9 - 12:30 PM"),
  createData("Hacking Begins", "-", "-", "Nov 9 - 12:00 PM", "Nov 5 - 12:00 PM"),
  createData("Hackathon 101", "Second Floor Common Area", "Discord #hackathon-101 VC", "Nov 10 - 12:30 PM", "Nov 10 - 01:00 PM"),
  createData("Team Formation", "Second Floor Common Area", "Discord #team-formation VC", "Nov 9 - 01:00 PM", "Nov 9 - 01:30 PM"),
  createData("Workshops (see below)", "Room 230", "Teams Meeting", "Nov 9 - 02:00 PM", "Nov 9 - 05:00 PM"),
  createData("Dinner", "Second Floor Common Area", "-", "Nov 9 - 06:00 PM", "Nov 9 - 06:30 PM"),
  createData("Super Smash Bros Tournament", "Esports Lab", "-", "Nov 9 - 07:00 PM", "Nov 9 - 08:00 PM"),
  createData("Bob Ross (MakeUC Edition)", "Esports Lab", "Discord #game-room-1-vc VC", "Nov 9 - 08:00 PM", "Nov 9 - 09:00 PM"),
  createData("Midnight Snack", "Second Floor Common Area", "-", "Nov 10 - 12:00 AM", "Nov 10 - 12:30 AM"),
  createData("Board Games/Jackbox Games", "Second Floor Common Area", "Discord #game-room-1-vc VC", "Nov 10 - 01:00 AM", "Nov 10 - 02:00 AM"),
  // createData("Sim Racing", "Second Floor Common Area", "-", "Nov 10 - 04:00 AM", "Nov 5 - 05:00 AM"),
  createData("Stretching", "Second Floor Common Area", "-", "Nov 10 - 06:00 AM", "Nov 10 - 06:30 AM"),
  createData("Breakfast", "Second Floor Common Area", "-", "Nov 10 - 09:00 AM", "Nov 5 - 10:00 AM"),
  createData("Hacking Ends", "-", "-", "Nov 10 - 12:00 PM", "Nov 10 - 12:00 PM"),  
  createData("Lunch", "Second Floor Common Area", "-", "Nov 10 - 12:00 PM", "Nov 10 - 1:00 PM"),
  createData("Judging", "Discord", "Assigned Discord VC", "Nov 10 - 12:00 PM", "Nov 10 - 03:00 PM"),
  createData("Closing Ceremony", "Room 230", "YouTube Stream", "Nov 10 - 05:00 PM", "Nov 10 - 06:00 PM"),
];

export const cyberData: EventInfo[] = [
  createData("Intro to CTF", "Room 230", "Discord #cyber-uc VC", "Nov 9 - 02:00 PM", "Nov 9 - 03:00 PM"),
  createData("CTF Start", "-", "-", "Nov 9 - 02:00 PM", "Nov 9 - 02:00 PM"),
  createData("CTF End", "-", "-", "Nov 10 - 12:00 AM", "Nov 10 - 12:00 AM"),
];

export const workshopData: EventInfo[] = [
  createData("KV", "Room 230", <Link href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_MDY0OTQ5NWUtY2ZhZi00ODU5LWE1ZjYtZDY2ZWE3ZWVlMmI3%40thread.v2/0?context=%7b%22Tid%22%3a%22f5222e6c-5fc6-48eb-8f03-73db18203b63%22%2c%22Oid%22%3a%22e0cebd79-a7bb-4111-b7f1-076b38496b9c%22%7d" target="_blank" className="underline">Teams Meeting</Link>, "Nov 9 - 02:00 PM", "Nov 9 - 03:00 PM"),
  createData("[IBM/Elevance Health] AI in Healthcare/Customer Care", "Room 230", <Link href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjcxNTQ0NjYtNTJmYy00MzdlLTgwYmQtYWJiNWQ5ZjgxOGM5%40thread.v2/0?context=%7b%22Tid%22%3a%22f5222e6c-5fc6-48eb-8f03-73db18203b63%22%2c%22Oid%22%3a%22e0cebd79-a7bb-4111-b7f1-076b38496b9c%22%7d" target="_blank" className="underline">Teams Meeting</Link>, "Nov 9 - 03:00 PM", "Nov 9 - 03:00 PM"),
  createData("[Tata Consultancy Services] Aerospace Data Tracking", "Room 230", <Link href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTk5NzdlYmUtYmI0NS00MzEzLWJmOGQtZTEyNTI1NTljZjU4%40thread.v2/0?context=%7b%22Tid%22%3a%22f5222e6c-5fc6-48eb-8f03-73db18203b63%22%2c%22Oid%22%3a%22e0cebd79-a7bb-4111-b7f1-076b38496b9c%22%7d" target="_blank" className="underline">Teams Meeting</Link>, "Nov 9 - 04:00 PM", "Nov 9 - 05:00 PM"),
];

export const transportData: EventInfo[] = [
  createData("Event Start", "Behind Lindner College of Business", "1819 Innovation Hub", "Nov 9 - TBD", "Nov 9 - TBD"),
  createData("Late Night", "1819 Innovation Hub", "Behind Lindner College of Business", "Nov 9 - TBD", "Nov 10 - TBD"),
  createData("Early Morning", "Behind Lindner College of Business", "1819 Innovation Hub", "Nov 10 - TBD", "Nov 10 - TBD"),
  createData("Event Close", "1819 Innovation Hub", "Behind Lindner College of Business", "Nov 10 - TBD", "Nov 10 - TBD"),
];

function ScheduleGrid({ name, location, location_virt, start, end }: EventInfo) {
  return (
    <TableRow className="border-b border-separate transition-colors bg-secondary">
      <TableCell className="text-center p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{name}</TableCell>
      <TableCell className="text-center p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{location}</TableCell>
      <TableCell className="text-center p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{location_virt}</TableCell>
      <TableCell className="text-center p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{start}</TableCell>
      <TableCell className="text-center p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{end}</TableCell>
    </TableRow>
  );
}

export function ScheduleRow({ scheduleEvent }: ScheduleGridProps) {
  return (
    <TableBody>
      {scheduleEvent.map(value => <ScheduleGrid key={value.name} {...value} />)}
    </TableBody>
  );
}

export interface ScheduleGridProps {
  scheduleEvent: EventInfo[];
}

export function HackerScheduleTable() {
  return (
    <Table className="flex flex-col sm:items-center sm:justify-evenly">
      
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium bg-primary rounded">
          <TableCell className="text-center font-semibold border-1 border-white">Event</TableCell>
          <TableCell className="text-center font-semibold border-1 border-white">In-Person Location</TableCell>
          <TableCell className="text-center font-semibold border-1 border-white">Virtual Location</TableCell>
          <TableCell className="text-center font-semibold border-1 border-white">Start Time</TableCell>
          <TableCell className="text-center font-semibold border-1 border-white">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={scheduleData} />
      </TableBody>
    </Table>
  );
}

export function CTFScheduleTable() {
  return (
    <Table className="flex flex-col sm:items-center sm:justify-evenly">
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium bg-primary">
          <TableCell className="text-center font-semibold">Event</TableCell>
          <TableCell className="text-center font-semibold">In-Person Location</TableCell>
          <TableCell className="text-center font-semibold">Virtual Location</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={cyberData} />
      </TableBody>
    </Table>
  );
}

export function WorkshopScheduleTable() {
  return (
    <Table className="flex flex-col sm:items-center sm:justify-evenly">
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium bg-primary">
          <TableCell className="text-center font-semibold">Event</TableCell>
          <TableCell className="text-center font-semibold">In-Person Location</TableCell>
          <TableCell className="text-center font-semibold">Virtual Location</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={workshopData} />
      </TableBody>
    </Table>
  );
}

export function TransportScheduleTable() {
  return (
    <Table className="flex flex-col sm:items-center sm:justify-evenly">
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium bg-primary">
          <TableCell className="text-center font-semibold">Purpose</TableCell>
          <TableCell className="text-center font-semibold">Pick-Up Location</TableCell>
          <TableCell className="text-center font-semibold">Drop-Off Location</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={transportData} />
      </TableBody>
    </Table>
  );
} 
