import { list } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import { relationship, select, text } from "@keystone-6/core/fields";
import passport from "passport";
import { z } from "zod";

import { addCompoundKey } from "../utils/compoundKeys";

import type { BaseKeystoneTypeInfo, BaseListTypeInfo, KeystoneConfig } from "@keystone-6/core/types";
import type { Strategy } from "passport";


export const KeystonePassportUser = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  passportDataId: z.string(),
});

export type KeystonePassportUserType = z.infer<typeof KeystonePassportUser>;

export interface CreatePassportAuthStrategy {
  strategy: Strategy,
  loginOptions?: passport.AuthenticateOptions,
  disabled?: boolean,
}

interface CreatePassportAuthStrategyFull extends Omit<CreatePassportAuthStrategy, "strategy"> {
  strategy: Required<Strategy>,
}

function isRequiredStrategy(strategy: CreatePassportAuthStrategy): strategy is CreatePassportAuthStrategyFull {
  if (strategy.strategy.name) { return true; }

  throw new Error("Strategy is missing a name.");
}

export interface CreatePassportAuthProps<ListTypeInfo extends BaseListTypeInfo> {
  listKey: ListTypeInfo["key"],
  strategies: CreatePassportAuthStrategy[],
  loginSuccessRedirectUrl?: string,
}

export function createPassportAuth<ListTypeInfo extends BaseListTypeInfo>({
  listKey,
  strategies: _strategies,
  loginSuccessRedirectUrl = "http://localhost:3000/dashboard",
}: CreatePassportAuthProps<ListTypeInfo>) {
  const strategies = _strategies.filter(isRequiredStrategy);
  const PassportStrategyStorage = list(addCompoundKey({
    access: {
      // TODO: Correspond to user-specific permissions
      operation: allOperations(() => false),
    },
    fields: {
      user: relationship({
        ref: listKey, many: false, db: {
          extendPrismaSchema(field) {
            // Add onDelete: Cascade to the `user` field of the PassportStrategyStorage object
            // So that PassportStrategyStorage record is also removed when a user is deleted
            if (field.startsWith("user")) {
              // Regex to add what inside @relation(...) with 'onDelete: Cascade'
              return field.replace(/@relation\((.*?)\)/, "@relation($1, onDelete: Cascade)");
            }
            return field;
          },
        },
      }),
      strategyName: select({
        type: "enum", options: strategies.map(strat => ({ label: strat.strategy.name, value: strat.strategy.name })),
        validation: { isRequired: true },
        isIndexed: true,
      }),
      data: text({ validation: { isRequired: true }, isIndexed: true }),
    },
  }, ["strategyName", "data"]));

  function withAuth<TypeInfo extends BaseKeystoneTypeInfo>(
    config: KeystoneConfig<TypeInfo>
  ): KeystoneConfig<TypeInfo> {
    const modifiedConfig = { ...config };

    modifiedConfig.lists = {
      ...config.lists,
      PassportStrategyStorage,
    };

    const extendExpressApp = config.server?.extendExpressApp;

    modifiedConfig.server = {
      ...config.server,
      extendExpressApp(app, context) {
        extendExpressApp?.(app, context);

        strategies.forEach(strat => {
          if (!strat.strategy.name) throw new Error("Strategy is missing a name.");
          // eslint-disable-next-line no-console
          if (strat.disabled) return console.warn(`Login strategy '${strat.strategy.name}' has been disabled.`);

          app.get(`/auth/strategy/${strat.strategy.name}/login`, (req, res, next) => {
            const loginOptions = { ...strat.loginOptions };

            // Inject state into the loginOptions
            if (typeof req.query.state === "string") { loginOptions["state"] = Buffer.from(req.query.state).toString("base64url"); }

            passport.authenticate(strat.strategy, loginOptions)(req, res, next);
          });
          app.get(`/auth/strategy/${strat.strategy.name}/redirect`,
            passport.authenticate(strat.strategy, { session: false }),
            async (req, res) => {
              const user = KeystonePassportUser.parse(req.user);

              const item = await context.prisma.passportStrategyStorage.upsert({
                create: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  strategyName: strat.strategy.name,
                  data: user.passportDataId,
                  // TODO: Don't hardcode user
                  user: {
                    connectOrCreate: {
                      create: {
                        name: user.name ?? user.email,
                        email: user.email,
                        // TODO: don't hardcode roles
                        roles: (await context.prisma.passportStrategyStorage.count()) > 0 ? undefined : ["admin"],
                      },
                      where: {
                        email: user.email,
                      },
                    },
                  },
                  strategyNameDataCompoundKey: `${strat.strategy.name}-${user.passportDataId}`,
                },
                update: {},
                where: {
                  strategyNameDataCompoundKey: `${strat.strategy.name}-${user.passportDataId}`,
                },
                select: {
                  // TODO: Don't hardcode user
                  user: true,
                },
              });

              const fullContext = await context.withRequest(req, res);
              await fullContext.sessionStrategy?.start({
                context: fullContext,
                // TODO: Don't hardcode user
                data: { ...user, strategy: strat.strategy.name, item: item.user },
              });

              if (typeof req.query.state === "string") {
                try {
                  // Redirect to the main page if the state is "isAdminLogin" so we doing redirect to the public site
                  const state = Buffer.from(req.query.state, "base64url").toString("utf-8");
                  if (state === "isAdminLogin") { return res.redirect("/"); }
                } catch (err) {
                  console.error("Error occurred when parsing req.query.state for passport redirect.");
                }
              }

              res.redirect(loginSuccessRedirectUrl);
            }
          );
        });

        app.get("/auth/logout", async (req, res) => {
          const fullContext = await context.withRequest(req, res);
          await fullContext.sessionStrategy?.end({ context: fullContext });
          res.json({ success: true });
        });
      },
    };

    return modifiedConfig;
  }

  return { withAuth };
}
