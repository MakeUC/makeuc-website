"use client";

import { useEffect, useState } from "react";

import { PageTitle } from "~/components/general/typography";


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted?: boolean;
}

const startTime = new Date("2023-11-04T11:30:00-04:00");
const endTime = new Date("2023-11-05T11:30:00-05:00");

const msToTime = (ms: number): TimeLeft => {
  const seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)) % 24),
    days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
};

export const ProgressLeft = (): number => {
  const now = new Date();
  const etaToStart = startTime.getTime() - now.getTime();

  if (etaToStart < 0) {
    // Has started, so check against end
    const etaToEnd = endTime.getTime() - now.getTime();

    // if (etaToEnd < 0) return undefined; // Marks the end

    return etaToEnd;
  }
  return etaToStart;
};

const getTimeLeft = (): TimeLeft | undefined => {
  const now = new Date();
  const etaToStart = startTime.getTime() - now.getTime();

  if (etaToStart < 0) {
    // Has started, so check against end
    const etaToEnd = endTime.getTime() - now.getTime();

    if (etaToEnd < 0) return undefined; // Marks the end

    return { ...msToTime(etaToEnd), hasStarted: true };
  }

  return msToTime(etaToStart);
};

interface TimerNumberProps {
  time: number;
  name: string;
}

function TimerNumber({ time, name }: TimerNumberProps) {
  return (
    <div className="flex bg-base-800 rounded">
      <div className="flex flex-col flex-grow items-center content-center p-4 w-32">
        <div className="text-6xl">{time}</div>
        <div className="text-lg">{name}</div>
      </div>
    </div>
  );
}

export function Timer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | undefined>();

  useEffect(() => {
    setTimeLeft(getTimeLeft()); // Run right away once

    const tick = setInterval(() => setTimeLeft(getTimeLeft()), 1000);

    return () => clearInterval(tick);
  }, []);

  if (!timeLeft)
    // Hacking has ended (indicated by undefined)
    return (
      <div className={"flex flex-col items-center ${className}"}>
        <PageTitle className="overflow-hidden whitespace-nowrap font-mono animate-typewriter-blinking-cursor-18">
          Hacking has
          <span className="text-primary-400">&nbsp;Ended</span>!
        </PageTitle>
      </div>
    );

  return (
    <>
      <div className="hidden animate-typewriter-blinking-cursor-25 animate-typewriter-blinking-cursor-26" />
      <div className={"flex flex-col items-center ${className}"}>
        <PageTitle
          className={"mb-10 overflow-hidden whitespace-nowrap font-mono animate-typewriter-blinking-cursor-${headerLength}"}
        >
          Time Until Hacking
          <span className="text-primary-400">
            {timeLeft.hasStarted ? " Ends" : " Begins"}
          </span>
          !
        </PageTitle>
        <div className="md:flex hidden  flex-grow justify-evenly">
          <TimerNumber time={timeLeft.days} name="DAYS" />
          <TimerNumber time={timeLeft.hours} name="HOURS" />
          <TimerNumber time={timeLeft.minutes} name="MINUTES" />
          <TimerNumber time={timeLeft.seconds} name="SECONDS" />
        </div>
        <div className="flex md:hidden  flex-grow justify-evenly">
          
          <TimerNumber time={timeLeft.hours} name="HOURS" />
          <TimerNumber time={timeLeft.minutes} name="MINUTES" />
        </div>
      </div>
    </>
  );
}
