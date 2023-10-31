import { list } from "@keystone-6/core";
import { float, integer, relationship, text } from "@keystone-6/core/fields";

import { allOperations, isAuthenticated } from "../auth/access";
import { addCompoundKey } from "../utils/compoundKeys";


export const Judgement = list(addCompoundKey({
  access: {
    operation: allOperations(isAuthenticated),
  },
  fields: {
    conceptCaliber: integer({
      validation: { isRequired: true },
    }),
    implementationAttempt: integer({
      validation: { isRequired: true },
    }),
    demonstrationAbility: integer({
      validation: { isRequired: true },
    }),
    presentationProfessionalism: integer({
      validation: { isRequired: true },
    }),
    overallScore: float({
      validation: { isRequired: true },
    }),
    applicableTracks: relationship({
      ref: "Track.judgements",
      many: true,
    }),
    disqualifyReason: text({
      isFilterable: true,
    }),
    disqualifiedBy: relationship({
      ref: "User",
    }),
    judge: relationship({
      ref: "User.judgements",
    }),
    project: relationship({
      ref: "Project.judgements",
    }),
  },
  hooks: {
    resolveInput({ context, resolvedData, operation }) {
      if (operation !== "create") { return resolvedData; }
      if (!context.session?.item.id) { throw new Error("Unknown session itemId."); }
      return { ...resolvedData, judge: { connect: { id: context.session.item.id } } };
    },
  },
}, ["judge", "project"]));
