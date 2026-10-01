import { SlashCommandBuilder } from "discord.js";

import { CHECK_IN, DISCORD_CONFIG as config } from "../config";
import { prisma } from "../utils/prisma";

import type { Command } from "./index";
import type { ChatInputCommandInteraction } from "discord.js";


export const verifyCommand = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify Registration For MakeUC!")
    .addStringOption(option =>
      option.setName("email")
        .setDescription("Insert the email address you used to register for MakeUC")
        .setRequired(true)),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    function sendReply(content: string) {
      return interaction.editReply({ content });
    }

    if (CHECK_IN !== "open") {
      return sendReply("Verification has not opened yet! Please come back later. We appreciate your patience!");
    }

    const guild = interaction.guild;
    if (!guild) { return sendReply("Please run this command in the MakeUC Discord server."); }

    const email = interaction.options.getString("email");

    if (!email) { return sendReply("Please specify an email!"); }

    const participant = await prisma.registrant.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
        registrationYear: 2026,
      },
    });

    if (!participant) {
      return sendReply("We could not find a registration with that email. Please make sure that the email you entered is correct.");
    }

    const role = await guild.roles.fetch(config.VERIFIED_ROLE_ID);
    if (!role) {
      // eslint-disable-next-line no-console
      console.error(`Configured participant role ${config.VERIFIED_ROLE_ID} was not found in guild ${guild.id}.`);
      return sendReply("Verification is temporarily unavailable. Please contact an organizer.");
    }

    const member = await guild.members.fetch(interaction.user.id);
    if (!member.roles.cache.has(role.id)) {
      try {
        await member.roles.add(role, "Registrant verified through /verify");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to assign participant role ${role.id} to ${interaction.user.id}:`, error);
        return sendReply("We couldn't assign your participant role. Please contact an organizer for help.");
      }
    }

    if (!participant.discordVerified) {
      await prisma.registrant.update({
        where: { id: participant.id },
        data: { discordVerified: true },
      });
    }

    return sendReply(`Welcome, ${participant.firstName} ${participant.lastName}! You have been verified and given the ${role} role.`);
  },
} as Command;
