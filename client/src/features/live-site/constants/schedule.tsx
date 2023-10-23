"use client";

import type { ScheduleData } from "../components/schedule-grid";


function createData(name_v: string, location_v: string, location_virt_v: string, start_v: string, end_v: string) {
  return { name: name_v, location: location_v, location_virt: location_virt_v, start: start_v, end: end_v };
}

export const scheduleData: ScheduleData[] = [
  {
    type: "Hacker",
    event: [
      createData("HACKING", "1819 Innovation Hub", "Discord Server", "Nov 4 - 11:30 AM", "-"),
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
    ],
  },
  {
    type: "Workshop",
    event: [
      createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 02:00 PM", "Nov 4 - 03:00 PM"),
      createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 03:00 PM", "Nov 4 - 04:00 PM"),
      createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 04:00 PM", "Nov 4 - 05:00 PM"),
    ],
  },
];
