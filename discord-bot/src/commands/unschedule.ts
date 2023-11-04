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
    await interaction.deferReply({ ephemeral: true });

    const permissions = interaction.member?.permissions;
    // You can only run the command if you're an administrator
    if (!permissions || typeof permissions === "string" || !permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.editReply({ content: "You cannot run this command." });
    }

    const id = interaction.options.getString("id");
    if (!id) { return interaction.editReply("Missing ID"); }

    try {
      await scheduler.cancelEvent(id);
      return interaction.editReply(`Unscheduled event with ID ${id}.`);
    } catch (err) {
      if (err instanceof UnknownScheduledEvent) {
        return interaction.editReply(`Scheduled Event with ID ${id} cannot be found.`);
      }

      throw err;
    }
  },
} as Command;