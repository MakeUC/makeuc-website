import { list } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";

import { allOperations, isAuthenticated } from "../auth/access";


export const Project = list({
  access: {
    operation: allOperations(isAuthenticated),
  },
  fields: {
    url: text({
      isIndexed: "unique",
      validation: { isRequired: true },
    }),
    name: text({
      validation: { isRequired: true },
    }),
    judgingGroup: integer({
      validation: { isRequired: true },
    }),
    year: integer({
      validation: { isRequired: true },
    }),
    judgements: relationship({
      ref: "Judgement.project",
      many: true,
      graphql: { omit: { create: true, update: true } },
    }),
  },
});
