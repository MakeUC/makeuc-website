import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { scheduler } from "..";

import type { Command } from "./index";
import type { CommandInteraction } from "discord.js";


export const scheduledEventsCommand = {
  data: new SlashCommandBuilder().setName("scheduled-events")
    .setDescription("Lists all scheduled events."),
  execute: async (interaction: CommandInteraction) => {
    const permissions = interaction.member?.permissions;
    // You can only run the command if you're an administrator
    if (!permissions || typeof permissions === "string" || !permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: "You cannot run this command.", ephemeral: true });
    }

    return interaction.reply({
      content: scheduler.formattedEvents().join("\n") || "No scheduled events.",
    });
  },
} as Command;