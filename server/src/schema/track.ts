import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

import { allOperations, isAuthenticated } from "../auth/access";


export const Track = list({
  access: {
    operation: allOperations(isAuthenticated),
  },
  fields: {
    name: text({
      isIndexed: "unique",
      validation: { isRequired: true },
      isFilterable: true,
    }),
    judgements: relationship({
      ref: "Judgement.applicableTracks",
      many: true,
      graphql: { omit: { create: true, update: true } },
    }),
  },
});
