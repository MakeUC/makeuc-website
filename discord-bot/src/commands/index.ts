import { scheduleCommand } from "./schedule";
import { scheduledEventsCommand } from "./scheduled-events";
import { unscheduleCommand } from "./unschedule";
import { verifyCommand } from "./verify";
import { whoamiCommand } from "./whoami";

import type { CommandInteraction, SlashCommandBuilder } from "discord.js";


type ExecuteType = (interaction: CommandInteraction) => Promise<unknown>;

export interface Command {
  data: SlashCommandBuilder,
  execute: ExecuteType,
}

export const commands = [
  scheduleCommand,
  scheduledEventsCommand,
  unscheduleCommand,
  verifyCommand,
  whoamiCommand,
];