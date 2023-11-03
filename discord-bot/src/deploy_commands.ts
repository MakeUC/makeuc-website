import { REST, Routes } from "discord.js";
import { discord_config as config } from "./config";
import { commands } from "./commands";

const commandData = commands.map((command) => command.data);

const rest = new REST().setToken(config.token);

type DeployCommandProps = {
  guildId: string
}

export async function deployCommands({ guildId }: DeployCommandProps) {
  try {
    console.log("Started deploying (/) commands");

    await rest.put(
      Routes.applicationGuildCommands(config.client_id, guildId),
      {
        body: commandData,
      }
    );

    console.log("Successfully loaded (/) commands");
  } catch (error) {
    console.error(`[DEPLOY COMMANDS]: ${error}`);
  }
}
