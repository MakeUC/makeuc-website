import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, timestamp, select, checkbox, file } from "@keystone-6/core/fields";

import { allOperations, isAuthenticated } from "../auth/access";
import { addCompoundKey } from "../utils/compoundKeys";
import { FROM_ADDRESS, REGISTRATION_URL, sendgrid } from "../utils/sendgrid";

import type { Lists } from ".keystone/types";


export function sendRegistrantEmail(registrant: Lists.Registrant.Item) {
  return sendgrid.send({
    from: FROM_ADDRESS,
    to: registrant.email,
    subject: `Confirm MakeUC ${new Date().getFullYear()} Registration`,
    templateId: "d-7e6b4ad4255e45ce8295638c61ef346c",
    dynamicTemplateData: {
      name: `${registrant.firstName} ${registrant.lastName}`,
      regURL: `${REGISTRATION_URL}${registrant.id}`,
    },
  });
}

export function sendRegistrantConfirmationEmail(registrant: Lists.Registrant.Item) {
  return sendgrid.send({
    from: FROM_ADDRESS,
    to: registrant.email,
    subject: `MakeUC ${new Date().getFullYear()} Registration Confirmed`,
    templateId: "d-c944baee63bb4b868d3bd036663826d2",
    dynamicTemplateData: {
      name: `${registrant.firstName} ${registrant.lastName}`,
    },
  });
}

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

    resume: file({ storage: "resume_storage" }),
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
    verified: checkbox({ defaultValue: false, graphql: { omit: { create: true, update: true } } }),
    acceptPhotoRelease: checkbox({ defaultValue: false, graphql: { omit: { create: true, update: true } } }),
    invitedInPerson: checkbox({ defaultValue: false, graphql: { omit: { create: true, update: true } } }),

    user: relationship({
      ref: "User.registrations",
      many: false,
    }),
  },
  graphql: {
    maxTake: 50,
  },
  hooks: {
    async afterOperation({ operation, item }) {
      if (operation !== "create" || !item) return;

      await sendRegistrantEmail(item as Lists.Registrant.Item)
        .then(resp => {
          if (!resp[0]) { return; }
          if (resp[0].statusCode === 202) { return; }

          // eslint-disable-next-line no-console
          console.error(resp);
        });
    },
  },
}, ["email", "registrationYear"]));
