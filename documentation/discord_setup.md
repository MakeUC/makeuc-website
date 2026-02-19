# Discord Bot Setup & Configuration

The Discord bot handles participant verification by checking their registration email against the database.

## Yearly Configuration

Each year, you must update the bot's configuration to point to the correct participant role and ensure the check-in process is enabled.

### 1. Update Role ID

When a user is verified, the bot assigns them a specific role.

- **Environment Variable:** `DISCORD_VERIFIED_ROLE_ID`
- **Location:** Update this in your hosting provider's environment variables (e.g., Railway).
- **How to get ID:** In Discord, right-click the role and select "Copy Role ID" (Developer Mode must be enabled).

### 2. Manual Permission Check

**CRITICAL:** The bot only assigns the role. It does **not** configure the role's permissions.

1. Go to **Server Settings > Roles**.
2. Select the new participant role.
3. Manually verify that this role has access to the appropriate channels (e.g., `#general`, `#announcements`, `#hackathon-chat`).
4. Ensure it has the correct permissions (e.g., View Channels, Send Messages, etc.).

### 3. Enable/Disable Verification

The `/verify` command checks an environment variable to see if verification is currently allowed.

- **Environment Variable:** `DISCORD_CHECK_IN`
- **Values:**
  - `open`: Verification is enabled.
  - `closed` (or any other value): Verification is disabled, and users will be told to come back later.

### 4. Update Current Year in Bot

The bot filters registrants by the current year to prevent users from previous years from re-verifying.

- **File:** `discord-bot/src/commands/verify.ts`
- **Action:** Update the `registrationYear` in the Prisma query.

```typescript
const participant = await prisma.registrant.findFirst({
  where: {
    email: {
      equals: email,
      mode: "insensitive",
    },
    registrationYear: 2026, // UPDATE THIS
  },
});
```

## Local Development

Refer to [discord-bot/README.md](../discord-bot/README.md) for instructions on running the bot locally.
