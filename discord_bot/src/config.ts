import { config } from "dotenv";

config();

if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_MAKEUC_GUILD_ID) {
  throw new Error("Missing Environment Variables for the discord token and discord client id");
}

export const discord_config = {
  token: process.env.DISCORD_TOKEN,
  client_id: process.env.DISCORD_CLIENT_ID,
  makeuc_guild_id: process.env.DISCORD_MAKEUC_GUILD_ID,
};
