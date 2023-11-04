/* eslint-disable no-console */
import dayjs from "dayjs";

import { client } from "..";
import { DISCORD_CONFIG as config } from "../config";

import { prisma } from "./prisma";


export class UnknownScheduledEvent extends Error {
  constructor() {
    super("That event has not been registered.");
    this.name = "UnknownScheduledEvent";
  }
}

export class ImpossibleScheduledEvent extends Error {
  constructor() {
    super("That event is impossible. The time occurs before the current time.");
    this.name = "ImpossibleScheduledEvent";
  }
}

export class TooFarAwayScheduledEvent extends Error {
  constructor() {
    super("That event is too far away. At most, it can be 2147483647 ms (roughly 24 days) in the future.");
    this.name = "TooFarAwayScheduledEvent";
  }
}


export interface ScheduledEvent {
  message: string;
  unixExecutionTime: number;
  guildId: string;
  channelId: string;
  timeout: ReturnType<typeof setTimeout> | null;
}

export class Scheduler {
  events: Map<string, ScheduledEvent>;

  constructor() {
    this.events = new Map();
    this.loadFromDatabase();
  }

  async loadFromDatabase() {
    // All the events for this guild
    const events = await prisma.discordScheduledMessage.findMany({ where: { guildId: config.MAKEUC_GUILD_ID } });

    events.forEach(
      async event => await this.setupEvent(event.id, { ...event, unixExecutionTime: Number(event.unixExecutionTime) })
    );
  }

  private setupEvent(eventId: string, event: Omit<ScheduledEvent, "timeout">) {
    const executeEvent = async (bypass = false) => {
      if (!this.events.has(eventId) && !bypass) { return; }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { guildId, channelId, message } = this.events.get(eventId)!;

      const guild = client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId);
      if (!guild) { return console.error(`Failed to execute scheduled event with id ${eventId}. Unable to find guild with id ${guildId}`); }

      const channel = guild.channels.cache.get(channelId) || await guild.channels.fetch(channelId);
      if (!channel) { return console.error(`Failed to execute scheduled event with id ${eventId}. Unable to find channel with id ${channelId} in ${guild.name}`); }
      if (!channel.isTextBased()) { return console.error(`Failed to execute scheduled event with id ${eventId}. The channel ${channel.name} in ${guild.name} is not a text channel.`); }

      await channel.send(message);
      try {
        await this.cancelEvent(eventId);
      } catch (err) {
        if (!(err instanceof UnknownScheduledEvent)) { throw err; }
      }
    };

    const offset = event.unixExecutionTime - dayjs().valueOf();

    // The scheduled message is past due, so run now
    if (offset <= 500) {
      this.events.set(eventId, { ...event, timeout: null });
      return executeEvent(true);
    }

    // The message is scheduled to be sent
    const timeout = setTimeout(executeEvent, offset);

    this.events.set(eventId, { ...event, timeout });
  }

  formattedEvents() {
    return Array.from(this.events)
      .map(([id, scheduledEvent]) => `[id=\`${id}\`]: sending "${scheduledEvent.message.replaceAll("@", "\\@")}" at <t:${dayjs(scheduledEvent.unixExecutionTime).unix()}:F> in <#${scheduledEvent.channelId}>`);
  }

  async scheduleEvent(event: Omit<ScheduledEvent, "timeout">): Promise<string> {
    const offset = event.unixExecutionTime - dayjs().valueOf();
    if (offset > 2147483647) { throw new TooFarAwayScheduledEvent(); }
    if (offset <= 0) { throw new ImpossibleScheduledEvent(); }

    const eventId = (await prisma.discordScheduledMessage.create({ data: event })).id;

    this.setupEvent(eventId, event);

    return eventId;
  }

  async cancelEvent(id: string) {
    if (!this.events.has(id)) { throw new UnknownScheduledEvent(); }

    await prisma.discordScheduledMessage.delete({ where: { id } });
    this.events.delete(id);

    const timeout = this.events.get(id)?.timeout;
    if (!timeout) { return; }

    clearTimeout(timeout);
  }
}