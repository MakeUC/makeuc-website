/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { statelessSessions } from "@keystone-6/core/session";
import { OAuth2Strategy as GoogleOAuth2Strategy } from "passport-google-oauth";
import { Strategy as MicrosoftOAuth2Strategy } from "passport-microsoft";
import { z } from "zod";

import { createPassportAuth } from "./passport";

import type { KeystonePassportUserType } from "./passport";
import type { TypeInfo } from ".keystone/types";


// for a stateless session, a SESSION_SECRET should always be provided
//   especially in production (statelessSessions will throw if SESSION_SECRET is undefined)
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = "-- DEV SECRET -- DONT USE IN PRODUCTION --";
}

const backendUrl = process.env.BACKEND_URL ?? "";

const googleId = process.env.PASSPORT_STRATEGY_GOOGLE_CLIENTID;
const googleSecret = process.env.PASSPORT_STRATEGY_GOOGLE_SECRET;

const microsoftClientId = process.env.PASSPORT_STRATEGY_MICROSOFT_CLIENTID;
const microsoftClientSecret = process.env.PASSPORT_STRATEGY_MICROSOFT_CLIENTSECRET;

const microsoftProfileSchema = z.object({
  provider: z.literal("microsoft"),
  name: z.object({
    familyName: z.string().optional(),
    givenName: z.string().optional(),
  }).optional(),
  id: z.string().uuid(),
  emails: z.array(z.object({
    type: z.string(),
    value: z.string(),
  })),
});

export const { withAuth } = createPassportAuth<TypeInfo["lists"]["User"]>({
  listKey: "User",
  strategies: [
    {
      disabled: !googleId || !googleSecret,
      strategy: new GoogleOAuth2Strategy({
        callbackURL: `${backendUrl}/auth/strategy/google/redirect`,
        clientID: googleId || "1",
        clientSecret: googleSecret || "1",
      }, (_accessToken, _refreshToken, profile, cb) => {
        const id = profile.id;
        const email = profile.emails?.[0]?.value;

        if (!email) { return cb(new Error("Email not found from Google strategy.")); }

        const user: KeystonePassportUserType = {
          passportDataId: id,
          email,
        };

        const name = profile.name;
        if (name) {
          user.name = `${name.givenName} ${name.familyName}`;
        }

        cb(null, user);
      }),
      loginOptions: {
        scope: ["email", "profile"],
      },
    },
    {
      disabled: !microsoftClientId || !microsoftClientSecret,
      strategy: new MicrosoftOAuth2Strategy({
        clientID: microsoftClientId || "1",
        clientSecret: microsoftClientSecret || "1",
        callbackURL: `${backendUrl}/auth/strategy/microsoft/redirect`,
        scope: ["openid", "email", "user.read"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, (_accessToken: unknown, _refreshToken: unknown, profile: unknown, cb: (error: any, user?: any) => void) => {
        const microsoftProfile = microsoftProfileSchema.safeParse(profile);
        if (!microsoftProfile.success) { return cb(new Error(`Invalid profile: ${profile}`), null); }
        const id = microsoftProfile.data.id;
        const email = microsoftProfile.data.emails?.[0]?.value;

        if (!email) { return cb(new Error("Email not found from Microsoft strategy.")); }

        const user: KeystonePassportUserType = {
          passportDataId: id,
          email,
        };

        const name = microsoftProfile.data.name;
        if (name) {
          user.name = `${name.givenName} ${name.familyName}`;
        }

        cb(null, user);
      }),
    },
  ],
  loginSuccessRedirectUrl: process.env.FRONTEND_LOGIN_SUCCESS_URL,
});

// statelessSessions uses cookies for session tracking
//   these cookies have an expiry, in seconds
//   we use an expiry of 30 days for this starter
const sessionMaxAge = 60 * 60 * 24 * 30;

export const session = statelessSessions({
  maxAge: sessionMaxAge,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secret: sessionSecret!,
});
