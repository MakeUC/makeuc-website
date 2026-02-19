# Toggling Registration & Email Setup

Registration for MakeUC is controlled primarily through a central configuration file. This guide also covers how to update the automated emails sent to participants.

## 🚀 Toggling Registration

Registration visibility and access are managed in `client/src/constants/config.ts`.

### 1. Central Configuration

Open `client/src/constants/config.ts` and update the following variables:

- `ShowRegistrationButton`: Set to `true` to show "Register Now" buttons on the home page and navbar.
- `ShowRegistration`: Set to `true` to allow access to the `/registration` page.
- `ShowMLHBanner`: Set to `true` to display the MLH trust badge.
- `ShowLiveSiteButton`: Set to `true` when the event is live to show the "Live Site" button.

### 2. Backend Access Control

To provide a hard stop at the API level (preventing submissions even if the frontend page is accessible):

- Set the `REGISTRATION_STATUS` environment variable to `disabled` in Railway.

---

## 📧 Email Configuration (SendGrid)

MakeUC uses SendGrid to send verification and confirmation emails.

### 1. Update Template IDs

Every year, you may want to update the design of the registration emails. Once you create a new Dynamic Template in SendGrid, you must update the IDs in the code.

- **File:** `server/src/schema/registrant.ts`
- **Functions to update:**
  - `sendRegistrantEmail`: Sends the initial verification link.
  - `sendRegistrantConfirmationEmail`: Sends the "Registration Confirmed" email after verification.

### 2. Sending Emails Manually

You can resend verification emails or mass-send a specific template from the Admin Dashboard.

1. Log in to the **Admin Dashboard (/admin)**.
2. Go to the **Utilities** page.
3. Use the **"Send Verification Emails"** button to target unverified registrants for the current year.
4. For custom mass emails, use the `massSendRegistrantEmail` GraphQL mutation (accessible via the API explorer).
