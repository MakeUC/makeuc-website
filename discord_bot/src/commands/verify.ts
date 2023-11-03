import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./index";
import { PrismaClient } from '@prisma/client';
import { checkin } from '../config';

const prisma = new PrismaClient();

export const verifyCommand = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify Users For MakeUC!")
    .addStringOption(option =>
      option.setName('email')
        .setDescription('Insert the email address the hacker used to register for MakeUC')
        .setRequired(true)),
  execute: async (interaction: ChatInputCommandInteraction) => {
    let reply = "";
    const email = interaction.options.getString('email');
    if (checkin !== "open") {
      reply = "Checkin is not open yet! Please wait until checkin starts. We appreciate your patience!";
      await interaction.reply({ content: reply });
      return
    }
    else if (email) {
      try {
        const participant = await prisma.registrant.findFirstOrThrow({
          where: {
            email: email,
            registrationYear: 2023,
          },
        });

        if (!participant) {
          reply = `I could not find a registration with the email: ${email}. Please make sure that the email you entered is correct!`;
          await interaction.reply({ content: reply });

          return
        }
        else if (participant.discordVerified) {
          reply = `Hello ${participant.firstName + " " + participant.lastName}, you ares already verified!`;
          await interaction.reply({ content: reply });

          return
        }
        else {
          reply = `Hello ${participant.firstName + " " + participant.lastName}, you have not verified yet. We will help you verify now!`;
          await interaction.reply({ content: reply });
          await prisma.registrant.update({
            where: {
              id: participant.id,
            },
            data: {
              verified: true, // Set the "status" to true
            },
          });

          return
        }

      } catch (err: any) {
        console.error(err.stack);
      }
    }

  }
} as Command;
