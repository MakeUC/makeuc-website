import { PrismaClient } from "@prisma/client";
import { SlashCommandBuilder } from "discord.js";

import { CHECK_IN } from "../config";

import type { Command } from "./index";
import type { ChatInputCommandInteraction } from "discord.js";


const prisma = new PrismaClient();

export const verifyCommand = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify Registration For MakeUC!")
    .addStringOption(option =>
      option.setName("email")
        .setDescription("Insert the email address you used to register for MakeUC")
        .setRequired(true)),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (CHECK_IN !== "open") {
      return interaction.reply({
        content: "Checkin has not opened yet! Please come back later. We appreciate your patience!",
      });
    }

    const email = interaction.options.getString("email");

    if (!email) {
      return interaction.reply({
        content: "Please specify an email!",
      });
    }

    const participant = await prisma.registrant.findFirst({
      where: {
        email: email,
        registrationYear: 2023,
      },
    });

    if (!participant) {
      return interaction.reply({
        content: "We could not find a registration with that email. Please make sure that the email you entered is correct.",
      });
    }

    if (participant.discordVerified) {
      return interaction.reply({
        content: `Hey, ${participant.firstName} ${participant.lastName}! You have already been verified!`,
      });
    }

    // Update the registration
    await prisma.registrant.update({
      where: { id: participant.id },
      data: { discordVerified: true },
    });

    return interaction.reply({
      content: `Welcome, ${participant.firstName} ${participant.lastName}! We have verified your registration!`,
    });
  },
} as Command;
