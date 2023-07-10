import { graphql } from "@keystone-6/core";

import { sendRegistrantConfirmationEmail } from "../schema/registrant";

import type { Context } from ".keystone/types";


export const extendGraphqlSchema = graphql.extend(base => ({
  graphql: {
    // Fill in statistics
    statistics: graphql.field({
      type: base.object("Registrant"), //Undefined --> Change in the future
      args: { year: graphql.arg({ type: graphql.nonNull(graphql.Int) }) },
      async resolve(source, { year }, context: Context) {
        const registrants = await context.db.Registrant.findMany({
          where: { registrationYear: { equals: year } },
        });

        const females = registrants.filter(registrant => registrant.gender === "Female");

        const femalePercentage = ((females.length) / registrants.length) * 100;

        const schools = [...new Set(registrants.map(registrant => registrant.schoolId))];

        const countries = [...new Set(registrants.map(registrant => registrant.country))];

        const ethnicities = {
          "Asian": registrants.filter(registrant => registrant.ethnicity === "Asian").length,
          "White": registrants.filter(registrant => registrant.ethnicity === "White").length,
          "Black or African American": registrants.filter(registrant => registrant.ethnicity === "Black or African American").length,
          "Hispanic or Latino": registrants.filter(registrant => registrant.ethnicity === "Hispanic or Latino").length,
          "Prefer not to answer": registrants.filter(registrant => registrant.ethnicity === "Prefer not to answer").length,
        };

        const educations = {
          "Bachelor's": registrants.filter(registrant => registrant.degree === "Bachelor's").length,
          "Master's": registrants.filter(registrant => registrant.degree === "Master's").length,
          "Associate's": registrants.filter(registrant => registrant.degree === "Associate's").length,
          "Doctorate": registrants.filter(registrant => registrant.degree === "Doctorate").length,
          "High School": registrants.filter(registrant => registrant.degree === "High School").length,
        };

        let stats = {
          countRegistrants: registrants.length,
          femalePercent: femalePercentage,
          countSchoolsRepresented: schools.length,
          countCountriesRepresented: countries.length,
          ethnicityBreakdown: ethnicities,
          educationBreakdown: educations,
        };

        return stats;
      },
    }),
  },
  mutation: {
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