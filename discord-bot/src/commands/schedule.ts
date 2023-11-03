import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command } from "./index";

export const scheduleCommand = {
  data: new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Currently returns the value passed in")
    .addIntegerOption(option => option.setName("value").setDescription("milliseconds to wait till scheduling")),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const value = interaction.options.getInteger("value") ?? 1000;
    const channel = await interaction.client.channels.fetch("895903170004418590") as TextChannel;
    if (channel !== null) {
      setTimeout(() => {
        channel.send("Delayed response!!!");
      }, value);
    }
    return interaction.reply(`Will be sending in ${value} ms`);
  }
} as Command;
