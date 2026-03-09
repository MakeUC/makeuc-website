# MakeUC Documentation Hub

Welcome to the central documentation for the MakeUC website. This repository handles the registration, live site, and administration for the annual MakeUC hackathon.

## 📅 Annual Organizer Checklist

Every year, the following tasks must be completed to prepare the website for the new hackathon season.

### 1. Registration Setup

- **Toggle Registration:** Enable the registration form on the website.
- **SendGrid Templates:** Update the SendGrid template IDs for confirmation emails.
- **Verify API Keys:** Ensure SendGrid and other service keys are valid.
- [Detailed Registration Guide](./registration_setup.md)

### 2. Discord Bot Configuration

- **Check-in Status:** Enable/disable registration via the Discord bot.
- **Role IDs:** Update the Discord role ID assigned to verified participants.
- **Permissions:** **Manually** verify that the new role has the correct permissions in the Discord server.
- [Detailed Discord Guide](./discord_setup.md)

### 3. UI & Content Updates

- **Schedule:** Update the event schedule for the current year.
- **Theming:** Update the yearly CSS and branding.
- [Detailed UI Update Guide](./ui_updates.md)

### 4. Database & Data Management

- **Backups:** Ensure previous years' data is backed up.
- **Data Export:** How to download the registrant table for external use.
- **Schema Updates:** How to add new fields to the registration form.
- [Detailed Database Guide](./database_management.md)

---

## 🛠 Developer Resources

- [Root README](../README.md): Technology stack and overall architecture.
- [DEVELOPMENT.md](../DEVELOPMENT.md): Local environment setup and common bugs.
- [KeystoneJS Docs](https://keystonejs.com/): Documentation for the backend framework used.
- [Next.js Docs](https://nextjs.org/): Documentation for the frontend framework used.
