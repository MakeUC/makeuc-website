/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { OAuth2Strategy as GoogleOAuth2Strategy } from "passport-google-oauth";

import { createPassportAuth } from "./passport";

import type { KeystonePassportUserType } from "./passport";
import type { TypeInfo } from ".keystone/types";


// for a stateless session, a SESSION_SECRET should always be provided
//   especially in production (statelessSessions will throw if SESSION_SECRET is undefined)
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = "-- DEV SECRET -- DONT USE IN PRODUCTION --";
}

const googleId = process.env.PASSPORT_STRATEGY_GOOGLE_CLIENTID!;
const googleSecret = process.env.PASSPORT_STRATEGY_GOOGLE_SECRET!;

export const { withAuth } = createPassportAuth<TypeInfo["lists"]["User"]>({
  listKey: "User",
  strategies: [
    new GoogleOAuth2Strategy({
      callbackURL: "/auth/strategy/google/redirect",
      clientID: googleId,
      clientSecret: googleSecret,
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
