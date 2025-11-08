"use client";

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
  date?: string;
  start?: string;
  end?: string;
}

function createData(name:string, location:string, location_virt:ReactNode, date:string, start:string, end:string) {
  return { name, location, location_virt, date, start, end };
}

function createDataInPerson(name:string, location:string, date:string, start:string, end:string) {
  return { name, location, date, start, end };
}

export const scheduleData: EventInfo[] = [
  createData("Check-In", "First Floor Main Desk", "Discord #✅verification", "Nov 8", "09:30 AM", "11:00 AM"),
  createData("Sponsor Expo", "Second Floor Common Area", "Discord Sponsors Channels", "Nov 8", "10:00 AM", "2:00 PM"),
  createData("Opening Ceremony", "Room 230", "YouTube Stream", "Nov 8", "11:00 AM", "11:45 AM"),
  createData("Lunch", "Second Floor Common Area", "-", "Nov 8", "12:00 PM", "12:30 PM"),
  createData("Hacking Begins", "-", "-", "Nov 8", "12:00 PM", "12:00 PM"),
  createData("Hackathon 101", "Room 220", "YouTube Stream", "Nov 8", "12:30 PM", "01:00 PM"),
  createData("Team Formation", "Room 220", "Discord #🤸team-formation", "Nov 8", "01:00 PM", "01:30 PM"),
  createData("Kloob - Intro to Mobile Development Workshop", "Room 230", "YouTube Stream", "Nov 8", "01:30 PM", "2:30 PM"),
  createData("Kinetic Vision - Connected Living: IoT for Your Home or Dorm Workshop", "Room 230", "YouTube Stream", "Nov 8", "02:30 PM", "3:30 PM"),
  createData("MLH - Intro to Google AI Studio Workshop", "Room 230", "YouTube Stream", "Nov 8", "03:30 PM", "4:30 PM"),
  createData("MLH - Meet Your 5th Teammate: Hacking with GitHub Copilot Workshop", "Room 230", "YouTube Stream", "Nov 8", "04:30 PM", "5:30 PM"),
  createData("MLH Tech Together", "Room 230", "YouTube Stream", "Nov 8", "05:30 PM", "06:00 PM"),
  createData("Dinner", "Second Floor Common Area", "-", "Nov 8", "06:00 PM", "06:30 PM"),
  createData("MLH - Bob Ross Painting", "Esports Lab", "-", "Nov 8", "06:30 PM", "07:00 PM"),
  createData("The Art of Not Quitting: Building Tech That Survives Reality Workshop", "Room 230", "YouTube Stream", "Nov 8", "07:00 PM", "08:00 PM"),
  createData("Super Smash Bros Tournament", "Esports Lab", "Discord #🎮game-room-1-vc", "Nov 8", "10:00 PM", "11:00 PM"),
  createData("Midnight Snack", "Second Floor Common Area", "-", "Nov 9", "12:00 AM", "12:30 AM"),
  createData("Board Games/Quiplash Games", "Second Floor Common Area", "Discord #🎮game-room-1-vc", "Nov 9", "01:00 AM", "02:00 AM"),
  createData("Sim Racing", "Room 230", "-", "Nov 9", "04:00 AM", "05:00 AM"),
  createData("Breakfast", "Second Floor Common Area", "-", "Nov 9", "09:00 AM", "10:00 AM"),
  createData("Hacking Ends", "-", "-", "Nov 9", "12:00 PM", "12:00 PM"),  
  createData("Lunch", "Second Floor Common Area", "-", "Nov 9", "12:00 PM", "1:00 PM"),
  createData("Judging", "Assigned Discord Judging VC", "Assigned Discord Judging VC", "Nov 9", "01:00 PM", "04:00 PM"),
  createData("Closing Ceremony", "Room 230", "YouTube Stream", "Nov 9", "05:00 PM", "06:00 PM"),
];

export const cyberData: EventInfo[] = [
  createData("CTF Start", "-", "-", "Nov 8", "12:00 PM", "12:00 PM"),
  createData("Intro to CTF", "Room 220", "YouTube Stream", "Nov 8", "01:30 PM", "02:00 PM"),
  createData("CTF End", "-", "-", "Nov 9", "12:00 AM", "12:00 AM"),
];

export const makerspaceData: EventInfo[] = [
  createDataInPerson("Makerspace Hours", "First Floor Makerspace", "Nov 8", "11:00 AM", "09:00 PM"),
  createDataInPerson("Makerspace Tour", "First Floor Makerspace", "Nov 8", "01:30 PM", "02:00 PM"),
  createDataInPerson("Makerspace Hours", "First Floor Makerspace", "Nov 9", "08:00 AM", "12:00 PM"),
];

export const transportData: EventInfo[] = [
  createData("Event Start", "Behind Lindner College of Business", "1819 Innovation Hub", "Nov 8", "10:00 AM", "12:00 PM"),
  createData("Late Night", "1819 Innovation Hub", "Behind Lindner College of Business", "Nov 8", "11:00 PM", "01:00 AM"),
  createData("Early Morning", "Behind Lindner College of Business", "1819 Innovation Hub", "Nov 9", "07:00 AM", "09:00 AM"),
  createData("Event Close", "1819 Innovation Hub", "Behind Lindner College of Business", "Nov 9", "05:00 PM", "07:00 PM"),
];

function ScheduleGrid({ name, location, location_virt, date, start, end }: EventInfo) {
  return (
    <TableRow className="border-b border-separate transition-colors bg-secondary">
      <TableCell className="text-center text-white font-semibold p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{name}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{location}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{location_virt}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{date}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{start}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{end}</TableCell>
    </TableRow>
  );
}

function ScheduleGridInPerson({ name, location, date, start, end }: EventInfo) {
  return (
    <TableRow className="border-b border-separate transition-colors bg-secondary">
      <TableCell className="text-center text-white font-semibold p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{name}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{location}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{date}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{start}</TableCell>
      <TableCell className="text-center text-white p-4 align-middle [&:has([role=checkbox])]:pr-0 border-white border-2">{end}</TableCell>
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

export function ScheduleRowInPerson({ scheduleEvent }: ScheduleGridProps) {
  return (
    <TableBody>
      {scheduleEvent.map(value => <ScheduleGridInPerson key={value.name} {...value} />)}
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
          <TableCell className="text-center font-semibold border-1 border-white">Date</TableCell>
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
          <TableCell className="text-center font-semibold">Date</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={cyberData} />
      </TableBody>
    </Table>
  );
}

export function MakerspaceScheduleTable() {
  return (
    <Table className="flex flex-col sm:items-center sm:justify-evenly">
      <TableBody>
        <TableRow className="h-12 px-4 text-left align-middle font-medium bg-primary">
          <TableCell className="text-center font-semibold">Event</TableCell>
          <TableCell className="text-center font-semibold">Location</TableCell>
          <TableCell className="text-center font-semibold">Date</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRowInPerson scheduleEvent={makerspaceData} />
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
          <TableCell className="text-center font-semibold">Date</TableCell>
          <TableCell className="text-center font-semibold">Start Time</TableCell>
          <TableCell className="text-center font-semibold">End Time</TableCell>
        </TableRow>
        <ScheduleRow scheduleEvent={transportData} />
      </TableBody>
    </Table>
  );
} 
