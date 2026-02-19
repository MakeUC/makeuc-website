# Yearly Website Preparation Checklist

This issue tracks the necessary updates for the upcoming hackathon season.

## Registration

- [ ] Update SendGrid confirmation email template ID in `server/src/schema/registrant.ts`
- [ ] Update `Config.ShowRegistration` and `Config.ShowRegistrationButton` in `client/src/constants/config.ts`
- [ ] Verify SendGrid API key is active in environment variables

## Discord Bot

- [ ] Set `DISCORD_CHECK_IN` to `open` in environment variables when ready
- [ ] Create a new Discord role for this year's participants
- [ ] Update `DISCORD_VERIFIED_ROLE_ID` in environment variables
- [ ] **Crucial:** Manually check and set all permissions for the new Discord role in the Discord server settings

## Database

- [ ] Update the `registrationYear` default value in `server/src/schema/registrant.ts`
- [ ] Ensure the database is backed up from the previous year
- [ ] (Optional) Update database schema if new registration fields are needed

## UI & Content

- [ ] Update the schedule in `client/src/features/live-site/components/schedule.tsx`
- [ ] Create a new yearly CSS file (e.g., `client/src/app/makeuc-2026.css`)
- [ ] Update the CSS import in `client/src/app/layout.tsx`
- [ ] Update any yearly dates/text on the landing page

## Verification

- [ ] Test the registration flow from start to finish
- [ ] Test Discord verification with the new role
