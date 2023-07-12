import { graphql } from "@keystone-6/core";

import { sendRegistrantConfirmationEmail } from "../schema/registrant";
import { getSchoolIndiaData } from "../scripts/seed/schoolIndia";

import type { Context } from ".keystone/types";


export const extendGraphqlSchema = graphql.extend(base => ({
  query: {
    // Fill in statistics
    statistics: graphql.field({
      type: graphql.String, //Undefined --> Change in the future
      args: { year: graphql.arg({ type: graphql.nonNull(graphql.Int) }) },
      async resolve(source, { year }, context: Context) {
        const registrants = await context.prisma.registrant.findMany({
          where: { registrationYear: { equals: year } },
        });

        const registrantCount = registrants.length;

        let femaleCount = 0;
        const schools = new Set<string>();
        const countries = new Set<string>();
        const ethnicities = new Map<string, number>();
        const education = new Map<string, number>();

        for (const registrant of registrants) {
          if (registrant.gender === "Female") ++femaleCount;
          if (registrant.schoolId) schools.add(registrant.schoolId);
          if (registrant.country) countries.add(registrant.country);
          ethnicities.set(registrant.ethnicity, (ethnicities.get(registrant.ethnicity) ?? 0) + 1);
          education.set(registrant.degree, (education.get(registrant.degree) ?? 0) + 1);
        }

        return JSON.stringify({
          countRegistrants: registrantCount,
          femalePercent: 100 * femaleCount / registrantCount,
          countSchoolsRepresented: schools.size,
          countCountriesRepresented: countries.size,
          ethnicityBreakdown: Object.fromEntries(
            [...ethnicities.entries()].map(([ethnicity, count]) => [ethnicity, count / registrantCount])
          ),
          educationBreakdown: Object.fromEntries(
            [...education.entries()].map(([degree, count]) => [degree, count / registrantCount])
          ),
        });
      },
    }),
  },
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