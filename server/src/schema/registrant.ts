import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, timestamp, select, checkbox } from "@keystone-6/core/fields";

import { allOperations, isAuthenticated } from "../auth/access";
import { addCompoundKey } from "../utils/compoundKeys";


export const Registrant = list(addCompoundKey({
  access: {
    operation: {
      ...allOperations(isAuthenticated),
      create: allowAll,
    },
  },

  fields: {
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    email: text({ isIndexed: true, validation: { isRequired: true } }),
    age: integer({ validation: { isRequired: true } }),
    gender: select({
      options: ["Male", "Female", "Other", "Prefer not to answer"],
      validation: { isRequired: true },
    }),
    ethnicity: select({
      options: [
        "Asian", "White", "Black or African American", "Hispanic or Latino",
        "American Indian or Alaska Native", "Native Hawaiian or Other Pacific Islander",
        "Other", "Prefer not to answer",
      ],
      validation: { isRequired: true },
    }),

    school: relationship({ ref: "School", many: false }),
    major: text({ validation: { isRequired: true } }),
    degree: select({
      options: ["High School", "Associate's", "Bachelor's", "Master's", "Doctorate", "Other"],
      validation: { isRequired: true },
    }),
    country: text({ validation: { isRequired: true } }),
    expectedGraduationYear: integer({ validation: { isRequired: true } }),

    resumeUrl: text(),
    hackathonsAttended: integer(),
    notes: text(),

    mlhCodeOfConductAgreement: checkbox(),
    mlhPrivacyPolicyAgreement: checkbox(),
    mlhEmailAgreement: checkbox(),

    registrationYear: integer({
      isIndexed: true,
      defaultValue: new Date().getFullYear(),
      ui: { createView: { fieldMode: "hidden" } },
      graphql: { omit: { create: true, update: true } },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
  graphql: {
    maxTake: 50,
  },
}, ["email", "registrationYear"]));