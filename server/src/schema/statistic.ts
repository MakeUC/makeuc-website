import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, integer } from "@keystone-6/core/fields";

import { allOperations, everyPredicate } from "../auth/access";


export const CachedStatistic = list({
  access: {
    operation: {
      ...allOperations(everyPredicate()),
      create: allowAll,
    },
  },
  fields: {
    number_of_project: integer({
      validation: { isRequired: true },
    }),
    link_to_all_projects: text({   // Assuming the link is a URL, if not adjust accordingly.
      validation: { isRequired: true },
    }),
    year: integer({ 
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
  },
});

