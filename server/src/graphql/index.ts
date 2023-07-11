import { graphql } from "@keystone-6/core";

import { sendRegistrantConfirmationEmail } from "../schema/registrant";
import { getSchoolIndiaData } from "../scripts/seed/schoolIndia";

import type { Context } from ".keystone/types";


export const extendGraphqlSchema = graphql.extend(base => ({
  mutation: {
    seedSchoolIndiaData: graphql.field({
      type: graphql.Boolean,
      async resolve(source, _, context: Context) {
        if (!context.session) return null;

        await context.prisma.school.createMany({ data: await getSchoolIndiaData() });
        return true;
      },
    }),
    verifyRegistrant: graphql.field({
      type: base.object("Registrant"),
      args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }) },
      async resolve(source, { id }, context: Context) {
        const foundRegistrant = await context.prisma.registrant.findFirst({
          where: { id, verified: { equals: false } },
        });

        if (!foundRegistrant) { throw Error("You have already been verified!"); }

        const registrant = await context.prisma.registrant.update({
          data: { verified: true },
          where: { id },
        });

        if (!registrant) { return null; }

        await sendRegistrantConfirmationEmail(registrant);

        return registrant;
      },
    }),
  },
}));