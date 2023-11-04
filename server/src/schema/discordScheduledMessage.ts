import { list } from "@keystone-6/core";
import { bigInt, text, timestamp } from "@keystone-6/core/fields";

import { allOperations, hasRoleOneOf } from "../auth/access";


export const DiscordScheduledMessage = list({
  access: {
    operation: {
      ...allOperations(hasRoleOneOf("admin")),
    },
  },
  fields: {
    message: text({ validation: { isRequired: true } }),
    guildId: text({ isIndexed: true, validation: { isRequired: true } }),
    channelId: text({ isIndexed: true, validation: { isRequired: true } }),
    unixExecutionTime: bigInt({ validation: { isRequired: true } }),

    createdAt: timestamp({ defaultValue: { kind: "now" } }),
  },
});