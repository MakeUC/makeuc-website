declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_DEV_MODE?: string;
      DISCORD_TOKEN: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_MAKEUC_GUILD_ID: string;
      DISCORD_VERIFIED_ROLE_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };
