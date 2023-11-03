import { verifyCommand } from "./verify";
import { whoamiCommand } from "./whoami";

import type { CommandInteraction, SlashCommandBuilder } from "discord.js";


type ExecuteType = (interaction: CommandInteraction) => Promise<unknown>;

export interface Command {
  data: SlashCommandBuilder,
  execute: ExecuteType,
}

export const commands = [
  whoamiCommand,
  verifyCommand,
];