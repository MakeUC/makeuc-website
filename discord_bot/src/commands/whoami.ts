import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./index";

export const whoamiCommand = {
  data: new SlashCommandBuilder().setName("whoami").setDescription("Replies with who I am!"),
  execute: async (interaction: CommandInteraction) => {
    return interaction.reply("MakeIT");
  }
} as Command;
