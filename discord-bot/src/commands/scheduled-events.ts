import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { scheduler } from "..";

import type { Command } from "./index";
import type { CommandInteraction } from "discord.js";


export const scheduledEventsCommand = {
  data: new SlashCommandBuilder().setName("scheduled-events")
    .setDescription("Lists all scheduled events."),
  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const permissions = interaction.member?.permissions;
    // You can only run the command if you're an administrator
    if (!permissions || typeof permissions === "string" || !permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.editReply({ content: "You cannot run this command." });
    }

    const content = scheduler.formattedEvents().join("\n").substring(0, 2000);

    return interaction.editReply({
      content: content || "No scheduled events.",
    });
  },
} as Command;