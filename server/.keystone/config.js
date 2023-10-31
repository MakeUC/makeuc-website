"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core8 = require("@keystone-6/core");

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

// src/express/api/index.ts
var import_express2 = require("express");

// src/express/api/utilities.ts
var import_express = require("express");
var import_express_fileupload = __toESM(require("express-fileupload"));
var import_zod = require("zod");
var registrantJsonFile = import_zod.z.array(import_zod.z.object({
  mlhCodeOfConductAgreement: import_zod.z.literal(true),
  mlhPrivacyPolicyAgreement: import_zod.z.literal(true),
  mlhEmailAgreement: import_zod.z.boolean().optional(),
  registrationYear: import_zod.z.number().int().optional(),
  firstName: import_zod.z.string(),
  lastName: import_zod.z.string(),
  email: import_zod.z.string(),
  phone: import_zod.z.string(),
  school: import_zod.z.string(),
  country: import_zod.z.string(),
  degree: import_zod.z.string(),
  major: import_zod.z.string(),
  expectedGraduationYear: import_zod.z.number().int(),
  hackathonsAttended: import_zod.z.number().int(),
  ethnicity: import_zod.z.string(),
  age: import_zod.z.number().int(),
  gender: import_zod.z.string(),
  notes: import_zod.z.string().optional(),
  createdAt: import_zod.z.string().datetime(),
  resumeUrl: import_zod.z.string().optional(),
  verified: import_zod.z.boolean().optional()
}));
var utilitiesRouter = (0, import_express.Router)();
utilitiesRouter.post("/import-registrants", (0, import_express_fileupload.default)(), async (req, res) => {
  if (!req.context.session)
    return res.sendStatus(403);
  const file_ = req.files?.file;
  const file2 = Array.isArray(file_) ? file_[0] : file_;
  if (!file2)
    return res.status(400).send("File not attached");
  let fileObj;
  try {
    const fileStr = file2.data.toString("utf-8");
    fileObj = JSON.parse(fileStr);
  } catch {
    return res.status(400).send("Failed to parse the data.");
  }
  const result = registrantJsonFile.safeParse(fileObj);
  if (!result.success) {
    return res.status(400).send(result.error);
  }
  const registrantData = result.data;
  const foundSchools = /* @__PURE__ */ new Map();
  const missingSchools = /* @__PURE__ */ new Set();
  async function findSchools() {
    for (const registrant of registrantData) {
      const schoolName = registrant.school;
      if (foundSchools.has(schoolName)) {
        continue;
      }
      const schoolIds = await req.context.prisma.$queryRaw`
        SELECT
          id
        FROM
          "School"
        WHERE
          SIMILARITY(name, ${schoolName}) > 0.45
        ORDER BY
          SIMILARITY(name, ${schoolName}) DESC
        LIMIT 1;
      `;
      if (schoolIds.length === 0) {
        missingSchools.add(schoolName);
      } else {
        foundSchools.set(schoolName, schoolIds[0].id);
      }
    }
  }
  await findSchools();
  await req.context.prisma.school.createMany({
    data: [...missingSchools].map((school) => ({
      name: school,
      city: "Unknown",
      state: "Unknown",
      county: "Unknown",
      country: "Unknown",
      alias: school
    }))
  });
  await findSchools();
  if (missingSchools.size > 0) {
    return res.status(500).send(`Missing Schools!: ${JSON.stringify([...missingSchools].sort())}`);
  }
  try {
    await req.context.prisma.registrant.createMany({
      data: registrantData.map(({ createdAt: _, phone: _phone, school, ...registrant }) => ({
        ...registrant,
        schoolId: foundSchools.get(school),
        emailRegistrationYearCompoundKey: `${registrant.email}-${registrant.registrationYear}`
      }))
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
    return res.status(500).send(JSON.stringify(err));
  }
  res.sendStatus(200);
});

// src/express/api/index.ts
var apiRouter = (0, import_express2.Router)();
apiRouter.use("/utilities", utilitiesRouter);

// src/express/utils.ts
function makeContextMiddleware(context) {
  const middleware = async (req, _, next) => {
    req.context = await context.withRequest(req);
    next();
  };
  return middleware;
}

// src/express/index.ts
function extendExpressApp(app, context) {
  app.use(makeContextMiddleware(context));
  app.use("/api", apiRouter);
}

// src/graphql/index.ts
var import_core2 = require("@keystone-6/core");

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

// src/utils/sendgrid.ts
var import_mail = __toESM(require("@sendgrid/mail"));
var API_KEY = process.env.SENDGRID_API_KEY;
import_mail.default.setApiKey(API_KEY);
var FROM_ADDRESS = process.env.SENDGRID_FROM_ADDRESS;
var REGISTRATION_URL = process.env.CONFIRM_REGISTRATION_URL;

// src/schema/registrant.ts
function sendEmailToRegistrant(registrant, sendgridTemplateId) {
  return import_mail.default.send({
    from: FROM_ADDRESS,
    to: registrant.email,
    templateId: sendgridTemplateId,
    dynamicTemplateData: Object.fromEntries(Object.entries(registrant).map(([key, value]) => [key, value?.toString() ?? ""]))
  });
}
function sendRegistrantEmail(registrant) {
  return import_mail.default.send({
    from: FROM_ADDRESS,
    to: registrant.email,
    subject: `Confirm MakeUC ${(/* @__PURE__ */ new Date()).getFullYear()} Registration`,
    templateId: "d-7e6b4ad4255e45ce8295638c61ef346c",
    dynamicTemplateData: {
      name: `${registrant.firstName} ${registrant.lastName}`,
      regURL: `${REGISTRATION_URL}${registrant.id}`
    }
  });
}
function sendRegistrantConfirmationEmail(registrant) {
  return import_mail.default.send({
    from: FROM_ADDRESS,
    to: registrant.email,
    subject: `MakeUC ${(/* @__PURE__ */ new Date()).getFullYear()} Registration Confirmed`,
    templateId: "d-c944baee63bb4b868d3bd036663826d2",
    dynamicTemplateData: {
      name: `${registrant.firstName} ${registrant.lastName}`
    }
  });
}
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
    gender: (0, import_fields2.select)({
      options: ["Male", "Female", "Other", "Prefer not to answer"],
      validation: { isRequired: true }
    }),
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
      options: ["High School", "Associate's", "Bachelor's", "Master's", "Doctorate", "Other"],
      validation: { isRequired: true }
    }),
    country: (0, import_fields2.text)({ validation: { isRequired: true } }),
    expectedGraduationYear: (0, import_fields2.integer)({ validation: { isRequired: true } }),
    resume: (0, import_fields2.file)({ storage: "resume_storage" }),
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
    }),
    verified: (0, import_fields2.checkbox)({ defaultValue: false, graphql: { omit: { create: true, update: true } } }),
    acceptPhotoRelease: (0, import_fields2.checkbox)({ defaultValue: false, graphql: { omit: { create: true, update: true } } }),
    invitedInPerson: (0, import_fields2.checkbox)({ defaultValue: false, graphql: { omit: { create: true, update: true } } }),
    user: (0, import_fields2.relationship)({
      ref: "User.registrations",
      many: false
    })
  },
  hooks: {
    async afterOperation({ operation, item }) {
      if (operation !== "create" || !item)
        return;
      await sendRegistrantEmail(item).then((resp) => {
        if (!resp[0]) {
          return;
        }
        if (resp[0].statusCode === 202) {
          return;
        }
        console.error(resp);
      });
    }
  }
}, ["email", "registrationYear"]));

// src/scripts/seed/schoolIndia.ts
var FAILED = Symbol("FAILED");
var seenNames = /* @__PURE__ */ new Set();
async function getSchoolIndiaData() {
  const data = await globImport_data_universities_json(`../../../data/universities-${5}.json`).catch(() => FAILED);
  if (typeof data === "symbol") {
    return [];
  }
  return data.default.filter((university) => {
    if (seenNames.has(university.university))
      return false;
    seenNames.add(university.university);
    return true;
  }).map(
    (university) => ({
      name: university.university.replaceAll(/\s\(Id: [A-Z0-9-]+\)/g, ""),
      city: university.district,
      state: university.state,
      county: "",
      country: "India",
      alias: ""
    })
  );
}

// src/graphql/index.ts
var extendGraphqlSchema = import_core2.graphql.extend((base) => ({
  query: {
    // Fill in statistics
    statistics: import_core2.graphql.field({
      type: import_core2.graphql.String,
      //Undefined --> Change in the future
      args: { year: import_core2.graphql.arg({ type: import_core2.graphql.nonNull(import_core2.graphql.Int) }) },
      async resolve(source, { year }, context) {
        const registrants = await context.prisma.registrant.findMany({
          where: { registrationYear: { equals: year } }
        });
        const registrantCount = registrants.length;
        let femaleCount = 0;
        const schools = /* @__PURE__ */ new Set();
        const countries = /* @__PURE__ */ new Set();
        const ethnicities = /* @__PURE__ */ new Map();
        const education = /* @__PURE__ */ new Map();
        for (const registrant of registrants) {
          if (registrant.gender === "Female")
            ++femaleCount;
          if (registrant.schoolId)
            schools.add(registrant.schoolId);
          if (registrant.country)
            countries.add(registrant.country);
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
          )
        });
      }
    })
  },
  mutation: {
    seedSchoolIndiaData: import_core2.graphql.field({
      type: import_core2.graphql.Boolean,
      async resolve(_source, _, context) {
        if (!context.session)
          return null;
        await context.prisma.school.createMany({ data: await getSchoolIndiaData() });
        return true;
      }
    }),
    verifyRegistrant: import_core2.graphql.field({
      type: base.object("Registrant"),
      args: { id: import_core2.graphql.arg({ type: import_core2.graphql.nonNull(import_core2.graphql.ID) }) },
      async resolve(_source, { id }, context) {
        const foundRegistrant = await context.prisma.registrant.findFirst({
          where: { id, verified: { equals: false } }
        });
        if (!foundRegistrant) {
          throw Error("You have already been verified!");
        }
        const registrant = await context.prisma.registrant.update({
          data: { verified: true },
          where: { id }
        });
        if (!registrant) {
          return null;
        }
        await sendRegistrantConfirmationEmail(registrant);
        return registrant;
      }
    }),
    resendVerificationEmails: import_core2.graphql.field({
      type: import_core2.graphql.list(import_core2.graphql.String),
      async resolve(_source, _, context) {
        if (!context.session)
          return null;
        const unverifiedRegistrants = await context.prisma.registrant.findMany({
          where: { verified: { equals: false }, registrationYear: { equals: (/* @__PURE__ */ new Date()).getFullYear() } }
        });
        for (const registrant of unverifiedRegistrants) {
          await sendRegistrantEmail(registrant);
        }
        return unverifiedRegistrants.map((registrant) => registrant.email);
      }
    }),
    massSendRegistrantEmail: import_core2.graphql.field({
      type: import_core2.graphql.nonNull(import_core2.graphql.list(import_core2.graphql.String)),
      args: {
        sendGridId: import_core2.graphql.arg({ type: import_core2.graphql.nonNull(import_core2.graphql.String) }),
        where: import_core2.graphql.arg({ type: base.inputObject("RegistrantWhereInput") })
      },
      async resolve(_source, { sendGridId, where }, context) {
        console.log("Here");
        const registrants = await context.sudo().db.Registrant.findMany({
          where: { registrationYear: { equals: (/* @__PURE__ */ new Date()).getFullYear() }, ...where }
        });
        console.log("Here2", registrants);
        for (const registrant of registrants) {
          await sendEmailToRegistrant(registrant, sendGridId);
        }
        console.log("Here3");
        return registrants.map((registrant) => registrant.email);
      }
    })
  }
}));

// src/schema/judgment.ts
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var Judgement = (0, import_core3.list)({
  access: {
    operation: allOperations(isAuthenticated)
  },
  fields: {
    conceptCaliber: (0, import_fields3.integer)({
      validation: { isRequired: true }
    }),
    implementationAttempt: (0, import_fields3.integer)({
      validation: { isRequired: true }
    }),
    demonstrationAbility: (0, import_fields3.integer)({
      validation: { isRequired: true }
    }),
    presentationProfessionalism: (0, import_fields3.integer)({
      validation: { isRequired: true }
    }),
    overallScore: (0, import_fields3.float)({
      validation: { isRequired: true }
    }),
    applicableTracks: (0, import_fields3.relationship)({
      ref: "Track.judgements",
      many: true
    }),
    disqualifyReason: (0, import_fields3.text)({
      isFilterable: true
    }),
    disqualifiedBy: (0, import_fields3.relationship)({
      ref: "User"
    }),
    judge: (0, import_fields3.relationship)({
      ref: "User.judgements"
    }),
    project: (0, import_fields3.relationship)({
      ref: "Project.judgements"
    })
  }
});

// src/schema/project.ts
var import_core4 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var Project = (0, import_core4.list)({
  access: {
    operation: allOperations(isAuthenticated)
  },
  fields: {
    url: (0, import_fields4.text)({
      isIndexed: "unique",
      validation: { isRequired: true }
    }),
    name: (0, import_fields4.text)({
      validation: { isRequired: true }
    }),
    judgingGroup: (0, import_fields4.integer)({
      validation: { isRequired: true }
    }),
    year: (0, import_fields4.integer)({
      validation: { isRequired: true }
    }),
    judgements: (0, import_fields4.relationship)({
      ref: "Judgement.project",
      many: true,
      graphql: { omit: { create: true, update: true } }
    })
  }
});

// src/schema/school.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var School = (0, import_core5.list)({
  access: {
    operation: {
      ...allOperations(isAuthenticated),
      query: import_access5.allowAll
    }
  },
  fields: {
    name: (0, import_fields5.text)({ isIndexed: "unique", validation: { isRequired: true } }),
    city: (0, import_fields5.text)({ isIndexed: true, validation: { isRequired: true } }),
    state: (0, import_fields5.text)({ isIndexed: true, validation: { isRequired: true } }),
    county: (0, import_fields5.text)({ isIndexed: true, validation: { isRequired: true } }),
    country: (0, import_fields5.text)({ isIndexed: true, validation: { isRequired: true } }),
    alias: (0, import_fields5.text)({ isIndexed: true, validation: { isRequired: true } }),
    createdAt: (0, import_fields5.timestamp)({
      defaultValue: { kind: "now" }
    })
  },
  graphql: {
    maxTake: 50
  }
});

// src/schema/track.ts
var import_core6 = require("@keystone-6/core");
var import_fields6 = require("@keystone-6/core/fields");
var Track = (0, import_core6.list)({
  access: {
    operation: allOperations(isAuthenticated)
  },
  fields: {
    name: (0, import_fields6.text)({
      isIndexed: "unique",
      validation: { isRequired: true },
      isFilterable: true
    }),
    judgements: (0, import_fields6.relationship)({
      ref: "Judgement.applicableTracks",
      many: true,
      graphql: { omit: { create: true, update: true } }
    })
  }
});

// src/schema/user.ts
var import_core7 = require("@keystone-6/core");
var import_fields7 = require("@keystone-6/core/fields");
var User = (0, import_core7.list)({
  access: {
    operation: allOperations(isAuthenticated)
  },
  fields: {
    name: (0, import_fields7.text)({ validation: { isRequired: true } }),
    email: (0, import_fields7.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields7.password)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields7.timestamp)({ defaultValue: { kind: "now" } }),
    roles: (0, import_fields7.select)({
      type: "enum",
      defaultValue: "default",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Organizer", value: "organizer" },
        { label: "Judge", value: "judge" },
        { label: "Default", value: "default" }
      ]
    }),
    registrations: (0, import_fields7.relationship)({
      ref: "Registrant.user",
      many: true
    }),
    judgements: (0, import_fields7.relationship)({
      ref: "Judgement.judge",
      many: true
    })
  },
  graphql: {
    maxTake: 50
  }
});

// src/schema/index.ts
var lists = {
  Judgement,
  Project,
  Registrant,
  School,
  Track,
  User
};

// keystone.ts
var {
  S3_BUCKET_NAME: bucketName = "resumes",
  S3_REGION: region = "us-east-2",
  S3_ACCESS_KEY_ID: accessKeyId = "minioadmin",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "minioadmin",
  S3_URL: s3Url = "http://minio:9000"
} = process.env;
var keystone_default = withAuth(
  (0, import_core8.config)({
    db: {
      provider: "postgresql",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url: process.env.POSTGRES_PRISMA_URL,
      shadowDatabaseUrl: process.env.POSTGRES_URL_NON_POOLING,
      idField: { kind: "cuid" },
      extendPrismaSchema(schema) {
        return schema.replace(/provider\s+= "prisma-client-js"/, 'provider = "prisma-client-js"\n  previewFeatures = ["postgresqlExtensions"]').replace(/provider\s+= "postgresql"/, 'provider = "postgresql"\n  extensions = [pg_trgm]');
      }
    },
    lists,
    session,
    telemetry: false,
    extendGraphqlSchema,
    storage: {
      // TODO: update keystone config
      resume_storage: {
        kind: "s3",
        type: "file",
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5e3 },
        endpoint: s3Url,
        forcePathStyle: true
      }
    },
    server: {
      port: parseInt(process.env.PORT ?? "8000"),
      cors: {
        origin: "*",
        allowedHeaders: "*",
        credentials: true,
        methods: "*"
      },
      maxFileSize: 50 * 1024 * 1024,
      extendExpressApp
    }
  })
);
//# sourceMappingURL=config.js.map
