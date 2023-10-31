// import { config } from "dotenv";

// config();

import * as dotenv from 'dotenv';


// Set the path to the .env file in the .devcontainer directory
const envPath = '/workspace/.devcontainer/.env';

// Load the environment variables from the specified .env file
dotenv.config({ path: envPath });

if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_MAKEUC_GUILD_ID) {
  throw new Error("Missing Environment Variables for the discord token and discord client id");
}
export const checkin = process.env.CHECK_IN
export const discord_config = {
  token: process.env.DISCORD_TOKEN,
  client_id: process.env.DISCORD_CLIENT_ID,
  makeuc_guild_id: process.env.DISCORD_MAKEUC_GUILD_ID,
};

