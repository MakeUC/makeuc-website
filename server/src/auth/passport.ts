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

function isRequiredStrategy(strategy: Strategy): strategy is Required<Strategy> {
  if (strategy.name) { return true; }

  throw new Error("Strategy is missing a name.");
}

export interface CreatePassportAuthProps<ListTypeInfo extends BaseListTypeInfo> {
  listKey: ListTypeInfo["key"],
  strategies: Strategy[],
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
      operation: allOperations(() => true),
    },
    fields: {
      user: relationship({ ref: listKey, many: false }),
      strategyName: select({
        type: "enum", options: strategies.map(strategy => ({ label: strategy.name, value: strategy.name })),
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

        strategies.forEach(strategy => {
          if (!strategy.name) throw new Error("Strategy is missing a name.");
          app.get(`/auth/strategy/${strategy.name}/login`, passport.authenticate(strategy, {
            scope: ["email", "profile"],
          }));
          app.get(`/auth/strategy/${strategy.name}/redirect`,
            passport.authenticate(strategy, { session: false }),
            async (req, res) => {
              const user = KeystonePassportUser.parse(req.user);

              const fullContext = await context.withRequest(req, res);
              await fullContext.sessionStrategy?.start({
                context: fullContext,
                data: { ...user, strategy },
              });

              await fullContext.prisma.passportStrategyStorage.upsert({
                create: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  strategyName: strategy.name,
                  data: user.passportDataId,
                  user: {
                    connectOrCreate: {
                      create: {
                        name: user.name ?? user.email,
                        email: user.email,
                      },
                      where: {
                        email: user.email,
                      },
                    },
                  },
                  strategyNameDataCompoundKey: `${strategy.name}-${user.passportDataId}`,
                },
                update: {},
                where: {
                  strategyNameDataCompoundKey: `${strategy.name}-${user.passportDataId}`,
                },
              });
              res.redirect(loginSuccessRedirectUrl);
            }
          );
        });

        app.post("/auth/logout", async (req, res) => {
          const fullContext = await context.withRequest(req, res);
          fullContext.sessionStrategy?.end({ context });
          res.json({ success: true });
        });
      },
    };

    return modifiedConfig;
  }

  return { withAuth };
}
