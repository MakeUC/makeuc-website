"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core4 = require("@keystone-6/core");

// src/auth/index.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = "-- DEV SECRET -- DONT USE IN PRODUCTION --";
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secret: sessionSecret
});

// src/schema/registrant.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");

// src/auth/access.ts
function isAuthenticated(args) {
  return !!args.session;
}
function allOperations(predicate) {
  return {
    create: predicate,
    query: predicate,
    update: predicate,
    delete: predicate
  };
}

// src/utils/compoundKeys.ts
var import_fields = require("@keystone-6/core/fields");
var import_lodash = require("lodash");
function addCompoundKey(listConfig, fieldNames) {
  const fieldName = (0, import_lodash.camelCase)(`${fieldNames.join(" ")} CompoundKey`);
  let newListConfig = { ...listConfig };
  newListConfig.fields[fieldName] = (0, import_fields.text)({
    isIndexed: "unique",
    ui: {
      createView: { fieldMode: "hidden" },
      itemView: { fieldMode: "hidden" },
      listView: { fieldMode: "hidden" }
    },
    graphql: { omit: { create: true, update: true } }
  });
  let hooks = newListConfig.hooks ?? {};
  const oldResolveInput = hooks.resolveInput;
  hooks.resolveInput = async (args) => {
    let resolvedData = args.resolvedData;
    resolvedData[fieldName] = fieldNames.map((field) => resolvedData[field] || args.item?.[field]).join("-");
    if (typeof oldResolveInput !== "function") {
      if (args.operation === "create" && oldResolveInput?.create)
        resolvedData = await oldResolveInput.create({ ...args, resolvedData });
      else if (args.operation === "update" && oldResolveInput?.update)
        resolvedData = await oldResolveInput.update({ ...args, resolvedData });
    } else if (oldResolveInput) {
      resolvedData = await oldResolveInput({ ...args, resolvedData });
    }
    return resolvedData;
  };
  newListConfig.hooks = hooks;
  return newListConfig;
}

// src/schema/registrant.ts
var Registrant = (0, import_core.list)(addCompoundKey({
  access: {
    operation: {
      ...allOperations(isAuthenticated),
      create: import_access.allowAll
    }
  },
  fields: {
    firstName: (0, import_fields2.text)({ validation: { isRequired: true } }),
    lastName: (0, import_fields2.text)({ validation: { isRequired: true } }),
    email: (0, import_fields2.text)({ isIndexed: true, validation: { isRequired: true } }),
    age: (0, import_fields2.integer)({ validation: { isRequired: true } }),
    ethnicity: (0, import_fields2.select)({
      options: [
        "Asian",
        "White",
        "Black or African American",
        "Hispanic or Latino",
        "American Indian or Alaska Native",
        "Native Hawaiian or Other Pacific Islander",
        "Other",
        "Prefer not to answer"
      ],
      validation: { isRequired: true }
    }),
    school: (0, import_fields2.relationship)({ ref: "School", many: false }),
    major: (0, import_fields2.text)({ validation: { isRequired: true } }),
    degree: (0, import_fields2.select)({
      options: ["High School", "Associate's", "Bachelor's", "Master's", "Doctorate"],
      validation: { isRequired: true }
    }),
    country: (0, import_fields2.text)({ validation: { isRequired: true } }),
    expectedGraduationYear: (0, import_fields2.integer)({ validation: { isRequired: true } }),
    resumeUrl: (0, import_fields2.text)(),
    hackathonsAttended: (0, import_fields2.integer)(),
    notes: (0, import_fields2.text)(),
    mlhCodeOfConductAgreement: (0, import_fields2.checkbox)(),
    mlhPrivacyPolicyAgreement: (0, import_fields2.checkbox)(),
    mlhEmailAgreement: (0, import_fields2.checkbox)(),
    registrationYear: (0, import_fields2.integer)({
      isIndexed: true,
      defaultValue: (/* @__PURE__ */ new Date()).getFullYear(),
      ui: { createView: { fieldMode: "hidden" } },
      graphql: { omit: { create: true, update: true } }
    }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" }
    })
  },
  graphql: {
    maxTake: 50
  }
}, ["email", "registrationYear"]));

// src/schema/school.ts
var import_core2 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var School = (0, import_core2.list)({
  access: {
    operation: {
      ...allOperations(isAuthenticated),
      query: import_access3.allowAll
    }
  },
  fields: {
    name: (0, import_fields3.text)({ isIndexed: "unique", validation: { isRequired: true } }),
    city: (0, import_fields3.text)({ isIndexed: true, validation: { isRequired: true } }),
    state: (0, import_fields3.text)({ isIndexed: true, validation: { isRequired: true } }),
    county: (0, import_fields3.text)({ isIndexed: true, validation: { isRequired: true } }),
    country: (0, import_fields3.text)({ isIndexed: true, validation: { isRequired: true } }),
    alias: (0, import_fields3.text)({ isIndexed: true, validation: { isRequired: true } }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: { kind: "now" }
    })
  },
  graphql: {
    maxTake: 50
  }
});

// src/schema/user.ts
var import_core3 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var User = (0, import_core3.list)({
  access: {
    operation: allOperations(isAuthenticated)
  },
  fields: {
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    email: (0, import_fields4.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields4.password)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields4.timestamp)({
      defaultValue: { kind: "now" }
    })
  },
  graphql: {
    maxTake: 50
  }
});

// src/schema/index.ts
var lists = {
  User,
  Registrant,
  School
};

// keystone.ts
var keystone_default = withAuth(
  (0, import_core4.config)({
    db: {
      provider: "postgresql",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url: process.env.POSTGRES_PRISMA_URL,
      shadowDatabaseUrl: process.env.POSTGRES_URL_NON_POOLING,
      idField: { kind: "cuid" }
    },
    lists,
    session,
    telemetry: false,
    server: {
      port: parseInt(process.env.PORT ?? "8000")
    }
  })
);
