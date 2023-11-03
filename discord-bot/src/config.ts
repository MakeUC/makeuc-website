const EXPECTED_ENV_VARIABLES = [
  "DISCORD_TOKEN",
  "DISCORD_CLIENT_ID",
  "DISCORD_MAKEUC_GUILD_ID",
  "DISCORD_VERIFIED_ROLE_ID",
];

const missingVariables = EXPECTED_ENV_VARIABLES.filter(varKey => !process.env[varKey]);

if (missingVariables.length > 0) {
  throw new Error(`The Discord Bot is missing the following environment variables: ${missingVariables.join(", ")}`);
}

export const CHECK_IN = process.env.DISCORD_CHECK_IN;

export const DISCORD_CONFIG = {
  TOKEN: process.env.DISCORD_TOKEN as string,
  CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
  MAKEUC_GUILD_ID: process.env.DISCORD_MAKEUC_GUILD_ID as string,
  VERIFIED_ROLE_ID: process.env.DISCORD_VERIFIED_ROLE_ID as string,
};

