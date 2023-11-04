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
    function sendReply(content: string) {
      return interaction.reply({
        content,
        ephemeral: true,
      });
    }

    if (CHECK_IN !== "open") {
      return sendReply("Verification has not opened yet! Please come back later. We appreciate your patience!");
    }

    if (!interaction.member) { return sendReply("Only discord members can register!"); }

    const email = interaction.options.getString("email");

    if (!email) { return sendReply("Please specify an email!"); }

    const participant = await prisma.registrant.findFirst({
      where: {
        email: email,
        registrationYear: 2023,
      },
    });

    if (!participant) {
      return sendReply("We could not find a registration with that email. Please make sure that the email you entered is correct.");
    }

    if (participant.discordVerified) {
      return sendReply(`Hey, ${participant.firstName} ${participant.lastName}! You have already been verified!`);
    }

    // Update the registration
    await prisma.registrant.update({
      where: { id: participant.id },
      data: { discordVerified: true },
    });

    // Add the discord role
    const roles = interaction.member.roles;
    if (!Array.isArray(roles)) { await roles.add(config.VERIFIED_ROLE_ID); }
    // eslint-disable-next-line no-console
    else { console.error(`No permission to add role to ${interaction.user.discriminator}(${interaction.user.id})!`); }

    return sendReply(`Welcome, ${participant.firstName} ${participant.lastName}! We have verified your registration!`);
  },
} as Command;
