import { Client, Events, GatewayIntentBits } from "discord.js";

import { commands } from "./commands";
import { DISCORD_CONFIG as config } from "./config";
import { deployCommands } from "./deploy-commands";


export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, c => {
  // eslint-disable-next-line no-console
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.GuildCreate, async guild => deployCommands({ guildId: guild.id }));

// IIFE needed to force registration specifically on MakeUC server
(async () => await deployCommands({ guildId: config.MAKEUC_GUILD_ID }))();


client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) { return; }

  const { commandName } = interaction;
  const command = commands.find(command => command.data.name === commandName);

  if (!command) { return; }

  await command.execute(interaction);
});

client.login(config.TOKEN);
