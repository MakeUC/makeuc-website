import { list } from "@keystone-6/core";
import { password, text, timestamp } from "@keystone-6/core/fields";

import { allOperations, isAuthenticated } from "../auth/access";



export const User = list({
  access: {
    operation: allOperations(isAuthenticated),
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({ validation: { isRequired: true } }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
  graphql: {
    maxTake: 50,
  },
});