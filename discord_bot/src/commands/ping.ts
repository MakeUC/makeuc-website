import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./index";

export const pingCommand = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  execute: async (interaction: CommandInteraction) => {
    return interaction.reply("Pong!");
  }
} as Command;
