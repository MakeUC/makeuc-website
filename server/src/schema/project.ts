import { graphql, list } from "@keystone-6/core";
import { integer, relationship, text, virtual } from "@keystone-6/core/fields";

import { allOperations, hasRoleOneOf } from "../auth/access";

import type { Context } from ".keystone/types";


export const Project = list({
  access: {
    operation: {
      ...allOperations(hasRoleOneOf("admin")),
      query: allOperations(hasRoleOneOf("admin", "organizer", "judge"))["query"],
    },
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
    applicableTracks: virtual({
      field: graphql.field({
        type: graphql.list(graphql.String),
        async resolve(item, _, context) {
          if (!item.id) { return []; }

          return (await (context as Context).prisma.judgement.findMany({
            where: {
              projectId: { equals: item.id.toString() },
            },
            select: {
              applicableTracks: true,
            },
          })).flatMap(judgement => judgement.applicableTracks.map(track => track.name));
        },
      }),
    }),
    countJudgements: virtual({
      field: graphql.field({
        type: graphql.Int,
        async resolve(item, _, context) {
          return (await (context as Context).prisma.judgement.count({
            where: { projectId: { equals: item.id.toString() } },
          }));
        },
      }),
    }),
    score: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, _, context) {
          return ((await (context as Context).prisma.judgement.aggregate({
            _avg: { overallScore: true },
            where: { projectId: item.id.toString() },
          }))._avg.overallScore || 0).toFixed(2);
        },
      }),
    }),
    disqualified: virtual({
      field: graphql.field({
        type: graphql.Boolean,
        async resolve(item, _, context) {
          return (await (context as Context).prisma.judgement.count({
            where: {
              projectId: item.id.toString(),
              disqualifiedById: { not: null },
            },
          })) !== 0;
        },
      }),
    }),
  },
});
