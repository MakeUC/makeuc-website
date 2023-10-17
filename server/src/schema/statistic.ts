import { list } from "@keystone-6/core";
import { text, integer } from "@keystone-6/core/fields";

import { allOperations, isAuthenticated } from "../auth/access";


export const CachedStatistic = list({
  access: {
    operation: {
      ...allOperations(isAuthenticated), 
    },
  },
  fields: {
    numberOfProject: integer({
      validation: { isRequired: true },
    }),
    linkToAllProjects: text({   // Assuming the link is a URL, if not adjust accordingly.
      validation: { isRequired: true },
    }),
    year: integer({ 
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
  },
});

