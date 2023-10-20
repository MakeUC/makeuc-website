import { list } from "@keystone-6/core";
import { password, relationship, select, text, timestamp } from "@keystone-6/core/fields";

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
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    roles: select({
      type: "enum",
      defaultValue: "default",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Organizer", value: "organizer" },
        { label: "Judge", value: "judge" },
        { label: "Default", value: "default" },
      ],
    }),
    registrations: relationship({
      ref: "Registrant.user",
      many: true,
    }),
    judgements: relationship({
      ref: "Judgement.judge",
      many: true,
    }),
  },
  graphql: {
    maxTake: 50,
  },
});
