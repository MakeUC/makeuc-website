"use client";

import {
  // Table,
  TableBody,
  // TableCell,
  // TableHeader,
  TableRow,
} from "~/components/ui/table";

import { scheduleData } from "../constants/schedule";


export interface EventInfo {
  name?: string;
  location?: string;
  location_virt?: string;
  start?: string;
  end?: string;
}

export interface ScheduleData {
  type?: string;
  event?: EventInfo[];
}

function ScheduleInfo({ name, location, location_virt, start, end }: EventInfo) {
  return(
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
  );
}

export function ScheduleRow({ type, event }: ScheduleData) {
  if (!event?.length) return <></>;

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-white rounded px-8 py-4">
      {type && (
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-primary-foreground text-xl text-center tracking-wider font-semibold">{type}</h3>
          <hr className="border border-primary-foreground" />
        </div>
      )}
      {event?.map(activity => <ScheduleInfo key={activity.name} {...activity} />)}
    </div>
  );
}

export interface ScheduleGridProps {
  scheduleEvent: ScheduleData[];
}

export function ScheduleGrid({ scheduleEvent }: ScheduleGridProps) {
  return (
    <div className="flex flex-col gap-8">
      {scheduleEvent.map(activity => <ScheduleInfo key={activity.type} {...activity} />)}
    </div>
  );
}


export function hackerSchedule() {
  return <ScheduleGrid scheduleEvent={scheduleData} />;
}