# Database Management & Data Export

This guide covers common database tasks, including exporting registrant data for external use and updating the database schema.

## 📥 Exporting Registrant Data (CSV)

If you need to download the full list of registrants (e.g., to send manual emails or for analysis), follow these steps:

1.  **Get the psql connect command from Railway:**
    - Go to the Railway project dashboard.
    - Click the **Postgres** service square.
    - Click the purple **"Connect"** button/toast.
    - Click the **psql command** to copy it (it looks like `psql -h ...`).
2.  **Connect to the database:**
    - Paste the command into any terminal and run it. You must have `psql` installed on your computer.
3.  **Run the copy command:**
    - Once connected, paste and run the following command:
    ```sql
    \copy "Registrant" TO '~/Downloads/registrant.csv' WITH CSV HEADER
    ```
4.  **Find your file:**
    - The file will be saved in your **Downloads** folder as `registrant.csv`. You can change the path and filename in the command above if needed.

## 🛠 Adding New Columns / Form Fields

To add a new field to the registration form, you must update the backend schema and run a database migration.

### 1. Update the Registration Year Default

Every year, you **must** update the default registration year in the schema to ensure new registrants are tagged correctly for the current year.

- **File:** `server/src/schema/registrant.ts`
- **Location:** Find the `registrationYear` field in the `fields` object.
- **Action:** Update the `defaultValue` if it is hardcoded, or verify it uses `new Date().getFullYear()`.

```typescript
registrationYear: integer({
  isIndexed: true,
  defaultValue: 2026, // UPDATE THIS EVERY YEAR
  ui: { createView: { fieldMode: "hidden" } },
  graphql: { omit: { create: true, update: true } },
}),
```

### 2. Update the Schema

Open `server/src/schema/registrant.ts` and add the new field to the `fields` object.

```typescript
// Example: Adding a 'dietaryRestrictions' field
dietaryRestrictions: text(),
```

### 3. Run Migrations

In your local development environment (inside the devcontainer):

1.  Run `yarn dev:server`. Keystone will detect the change and prompt you to create a migration.
2.  Follow the prompts to name and apply the migration.
3.  Commit the generated migration file in `server/migrations/`.

### 4. Update the Frontend

1.  Update the registration form in `client/src/features/registration/` to include the new input field.
2.  Update the GraphQL mutation in the frontend to send the new field's value to the server.

## 📂 Database Backups

We currently do not pay for database backups. It is recomended to manually download the entire database before development for the new season begins.
