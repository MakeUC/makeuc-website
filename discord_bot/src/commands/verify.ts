import { ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";
import { Command } from "./index";
import { PrismaClient } from '@prisma/client';
import { checkin } from '../config';



const prisma = new PrismaClient();


export const verifyCommand = {
  data: new SlashCommandBuilder()
    .setName("verify-new")
    .setDescription("Verify Users For MakeUC!")
    .addStringOption(option =>
      option.setName('email')
        .setDescription('Insert the email address the hacker used to register for MakeUC')
        .setRequired(true)),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const email = interaction.options.getString('email');
    console.log(email);
    let reply = "";

    if (checkin === "close") {
      reply = "Checkin is not open yet! Please wait until checkin starts. We appreciate your patience!";
      await interaction.reply({ content: reply });
    }
    if (checkin === "open" && email) {
      (async function () {
        try {
          const participant = await prisma.registrant.findFirstOrThrow({
            where: {
              email: email,
              registrationYear: 2023,
            },
          });

          console.log(participant)

          if (!participant) {
            reply = `I could not find a registration with the email: ${email}. Please make sure that the email you entered is correct!`;
            await interaction.reply({ content: reply });
          } else if (participant.verified) {
            reply = `Hello ${participant.firstName + participant.lastName}, you already checked in!`;
            await interaction.reply({ content: reply });
          } else {
            reply = `Hello ${participant.firstName + participant.lastName}, you have not checked in yet. Please enter \`/checkin <email>\` in the verification channel!`;
            await interaction.reply({ content: reply });
            prisma.registrant
          }

        } catch (err: any) {
          console.error(err.stack);
        }
      })();
    }

  }
} as Command;
