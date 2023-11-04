/* eslint-disable no-console */
import { Client, Events, GatewayIntentBits, OAuth2Scopes, PermissionFlagsBits } from "discord.js";

import { commands } from "./commands";
import { DISCORD_CONFIG as config } from "./config";
import { deployCommands } from "./deploy-commands";
import { Scheduler } from "./utils/scheduler";


export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

export const scheduler = new Scheduler();

client.once(Events.ClientReady, async c => {
  await scheduler.loadFromDatabase();

  const inviteLink = client.generateInvite({
    scopes: [OAuth2Scopes.Bot],
    permissions: [PermissionFlagsBits.ManageRoles, PermissionFlagsBits.UseApplicationCommands],
  });
  console.log(`Ready! Logged in as ${c.user.tag}`);
  console.log(`Invite the bot to join with the following link: ${inviteLink}`);
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
