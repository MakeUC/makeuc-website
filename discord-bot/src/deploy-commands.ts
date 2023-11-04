/* eslint-disable no-console */
import { REST, Routes } from "discord.js";

import { commands } from "./commands";
import { DISCORD_CONFIG as config } from "./config";


const commandData = commands.map(command => command.data);

const rest = new REST().setToken(config.TOKEN);

interface DeployCommandProps {
  guildId: string
}

export async function deployCommands({ guildId }: DeployCommandProps) {
  try {
    console.log("Started deploying (/) commands");

    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, guildId),
      { body: commandData }
    );

    console.log("Successfully loaded (/) commands");
  } catch (error) {
    console.error(`[DEPLOY COMMANDS]: ${error}`);
  }
}
