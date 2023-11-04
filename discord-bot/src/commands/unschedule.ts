import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { scheduler } from "..";
import { UnknownScheduledEvent } from "../utils/scheduler";

import type { Command } from "./index";
import type { ChatInputCommandInteraction } from "discord.js";


export const unscheduleCommand = {
  data: new SlashCommandBuilder().setName("unschedule")
    .setDescription("Unschedule a scheduled event")
    .addStringOption(option =>
      option.setName("id")
        .setDescription("Id of the message to delete")
        .setRequired(true)
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const permissions = interaction.member?.permissions;
    // You can only run the command if you're an administrator
    if (!permissions || typeof permissions === "string" || !permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: "You cannot run this command.", ephemeral: true });
    }

    const id = interaction.options.getString("id");
    if (!id) { return interaction.reply("Missing ID"); }

    try {
      await scheduler.cancelEvent(id);
      interaction.reply(`Unscheduled event with ID ${id}.`);
    } catch (err) {
      if (err instanceof UnknownScheduledEvent) {
        return interaction.reply(`Scheduled Event with ID ${id} cannot be found.`);
      }

      throw err;
    }
  },
} as Command;