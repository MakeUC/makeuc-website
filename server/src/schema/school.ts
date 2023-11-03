import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp } from "@keystone-6/core/fields";

import { allOperations, hasRoleOneOf } from "../auth/access";


export const School = list({
  access: {
    operation: {
      ...allOperations(hasRoleOneOf("admin")),
      query: allowAll,
    },
  },

  fields: {
    name: text({ isIndexed: "unique", validation: { isRequired: true } }),
    city: text({ isIndexed: true, validation: { isRequired: true } }),
    state: text({ isIndexed: true, validation: { isRequired: true } }),
    county: text({ isIndexed: true, validation: { isRequired: true } }),
    country: text({ isIndexed: true, validation: { isRequired: true } }),
    alias: text({ isIndexed: true, validation: { isRequired: true } }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
  graphql: {
    maxTake: 50,
  },
});