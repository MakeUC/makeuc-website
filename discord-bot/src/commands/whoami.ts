import { SlashCommandBuilder } from "discord.js";

import type { Command } from "./index";
import type { CommandInteraction } from "discord.js";


export const whoamiCommand = {
  data: new SlashCommandBuilder().setName("whoami").setDescription("Replies with who I am!"),
  execute: async (interaction: CommandInteraction) => {
    return interaction.reply("MakeIT");
  },
} as Command;
