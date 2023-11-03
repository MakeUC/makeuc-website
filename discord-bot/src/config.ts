if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_MAKEUC_GUILD_ID) {
  throw new Error("Missing Environment Variables for the discord token and discord client id");
}

export const CHECK_IN = process.env.CHECK_IN;

export const DISCORD_CONFIG = {
  TOKEN: process.env.DISCORD_TOKEN,
  CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  MAKEUC_GUILD_ID: process.env.DISCORD_MAKEUC_GUILD_ID,
};

