import { graphql } from "@keystone-6/core";

import { sendEmailToRegistrant, sendRegistrantConfirmationEmail, sendRegistrantEmail } from "../schema/registrant";
import { getSchoolIndiaData } from "../scripts/seed/schoolIndia";

import type { Context } from ".keystone/types";


export const extendGraphqlSchema = graphql.extend(base => ({
  query: {
    // Fill in statistics
    statistics: graphql.field({
      type: graphql.String, //Undefined --> Change in the future
      args: { year: graphql.arg({ type: graphql.nonNull(graphql.Int) }) },
      async resolve(source, { year }, context: Context) {
        if (!context.session) {
          return null;
        }
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
          femalePercent: 100 * femaleCount / (registrantCount || 1),
          countSchoolsRepresented: schools.size,
          countCountriesRepresented: countries.size,
          ethnicityBreakdown: Object.fromEntries(
            [...ethnicities.entries()].map(([ethnicity, count]) => [ethnicity, count / (registrantCount || 1)])
          ),
          educationBreakdown: Object.fromEntries(
            [...education.entries()].map(([degree, count]) => [degree, count / (registrantCount || 1)])
          ),
        });
      },
    }),
  },
  mutation: {
    disqualifyProject: graphql.field({
      type: base.object("Judgement"),
      args: {
        projectId: graphql.arg({ type: graphql.ID }),
        reason: graphql.arg({ type: graphql.String }),
      },
      resolve(_source, { projectId, reason }, context: Context) {
        const userId = context.session.item.id;
        if (!userId) throw new Error("Missing userId when disqualifying project");

        return context.db.Judgement.createOne({
          data: {
            project: { connect: { id: projectId } },
            disqualifiedBy: { connect: { id: userId } },
            disqualifyReason: reason,
            judge: { connect: { id: userId } },
            overallScore: 0,
            conceptCaliber: 0,
            demonstrationAbility: 0,
            implementationAttempt: 0,
            presentationProfessionalism: 0,
          },
        });
      },
    }),
    seedSchoolIndiaData: graphql.field({
      type: graphql.Boolean,
      async resolve(_source, _, context: Context) {
        if (!context.session) return null;

        await context.prisma.school.createMany({ data: await getSchoolIndiaData() });
        return true;
      },
    }),
    verifyRegistrant: graphql.field({
      type: base.object("Registrant"),
      args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }) },
      async resolve(_source, { id }, context: Context) {
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
    resendVerificationEmails: graphql.field({
      type: graphql.list(graphql.String),
      async resolve(_source, _, context: Context) {
        if (!context.session) return null;

        // Get all of the registrants from the current year that are NOT verified
        const unverifiedRegistrants = await context.prisma.registrant.findMany({
          where: { verified: { equals: false }, registrationYear: { equals: new Date().getFullYear() } },
        });

        // Send emails for each unverified registrant
        for (const registrant of unverifiedRegistrants) {
          await sendRegistrantEmail(registrant);
        }

        return unverifiedRegistrants.map(registrant => registrant.email);
      },
    }),
    massSendRegistrantEmail: graphql.field({
      type: graphql.nonNull(graphql.list(graphql.String)),
      args: {
        sendGridId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
        where: graphql.arg({ type: base.inputObject("RegistrantWhereInput") }),
        skip: graphql.arg({ type: graphql.Int }),
        take: graphql.arg({ type: graphql.Int }),
      },
      async resolve(_source, { sendGridId, where, skip, take }, context: Context) {
        if (!context.session) return [];

        // Get all of the registrants from the current year that are NOT verified
        const registrants = await context.sudo().db.Registrant.findMany({
          where: { registrationYear: { equals: new Date().getFullYear() }, ...where },
          skip: skip || undefined,
          take: take || undefined,
        });

        // Send emails for each unverified registrant
        for (const registrant of registrants) {
          await sendEmailToRegistrant(registrant, sendGridId);
        }

        return registrants.map(registrant => registrant.email);
      },
    }),
  },
}));
