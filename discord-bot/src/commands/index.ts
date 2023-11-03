import { CommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";

import { whoamiCommand } from "./whoami";
import { scheduleCommand } from "./schedule";
import { verifyCommand } from "./verify";

type ExecuteType = (interaction: CommandInteraction) => Promise<any>;

export interface Command {
  data: SlashCommandBuilder,

  execute: ExecuteType,
}

export const commands = [
  whoamiCommand,
  scheduleCommand,
  verifyCommand,
];