"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { hackerScheduleData } from "../constants/schedule";


export interface ScheduleData {
  name: string;
  location: string;
  location_virt: string;
  start: string;
  end: string;
}


export function ScheduleRow({ name, location, location_virt, start, end }: ScheduleData) {
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-white rounded px-8 py-4">
      <Table className="w-full flex flex-col gap-2">
        <TableHeader>
          <TableRow style={{ backgroundColor: "#191919", textTransform: "uppercase" }}>
            <TableCell align="center" className="schedule-name">
              <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
                Event
              </span>
            </TableCell>
            <TableCell align="center" className="schedule-name">
              <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
                In-Person Location
              </span>
            </TableCell>
            <TableCell align="center" className="schedule-name">
              <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
                Online Location
              </span>
            </TableCell>
            <TableCell align="center" className="schedule-date-time">
              <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
                Start Time (EDT)
              </span>
            </TableCell>
            <TableCell align="center" className="schedule-date-time">
              <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
                End Time (EDT)
              </span>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow style={{ backgroundColor: "#191919" }}>
            <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
              {name}
            </span>
            <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
              {location}
            </span>
            <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
              {location_virt}
            </span>
            <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
              {start}
            </span>
            <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
              {end}
            </span>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export interface ScheduleGridProps {
  scheduleData: ScheduleData[];
}

export function ScheduleGrid({ scheduleData }: ScheduleGridProps) {
  return (
    <div className="flex flex-col gap-8">
      {scheduleData.map(activity => <ScheduleRow key={activity.name} {...activity} />)}
    </div>
  );
}


export function hackerScheduleGridPlaceholder() {
  return <ScheduleGrid scheduleData={hackerScheduleData} />;
}