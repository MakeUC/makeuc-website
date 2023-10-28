declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string,
      DISOCRD_CLIENT_ID: string,
      DISCORD_MAKEUC_GUILD_ID: string,
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
