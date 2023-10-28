import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./index";


export const verifyCommand = {
  data: new SlashCommandBuilder()
    .setName("verify-new")
    .setDescription("Verify Users!")
    .addStringOption(option =>
      option.setName('email')
        .setDescription('Insert the email address the hacker used to register for MakeUC')
        .setRequired(true)),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const email = interaction.options.getString('email');
    console.log(email);
    let reply = "";
    (async function () {
      try {
        const db = client.db("makeuc");
        const registrant = await db.collection("registrant").findOne({ email: email });

        if (!registrant) {
          reply = `I could not find a registration with the email: \`${email}\`. Please make sure that the email you entered is correct!`;
          await interaction.reply(reply);
        }
        if (registrant.isCheckedIn) {
          reply = `Hello ${registrant.fullName}, you already checked in!`;
          await interaction.reply(reply);
        }
        else {
          reply = `Hello ${registrant.fullName}, you have not checked in yet. Please enter \`/checkin <email>\` in the verification channel!`;
          await interaction.reply(reply);
        }
      } catch (err) {
        console.log(err.stack);
      }
      // client.close();
      // console.log('Connection closed.');
    })();

    return interaction.reply("This is the email: " + email)
    // return interaction.reply("I'm Verifying BABYYYYYY!!!");
  }
} as Command;
