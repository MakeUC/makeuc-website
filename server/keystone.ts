import { config } from "@keystone-6/core";


import { withAuth, session } from "./src/auth";
import { extendExpressApp } from "./src/express";
import { extendGraphqlSchema } from "./src/graphql";
import { lists } from "./src/schema";

import type { Request as ExpressRequest } from "express";


const {
  S3_BUCKET_NAME: bucketName = "resumes",
  S3_REGION: region = "us-east-2",
  S3_ACCESS_KEY_ID: accessKeyId = "minioadmin",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "minioadmin",
  S3_URL: s3Url = "http://minio:9000",
} = process.env;

const isDev = process.env.MY_DEV_MODE === "1";

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url: process.env.POSTGRES_PRISMA_URL!,
      shadowDatabaseUrl: process.env.POSTGRES_URL_NON_POOLING,
      idField: { kind: "cuid" },
      extendPrismaSchema(schema) {
        return schema
          // Add preview features (specifically postgresqlExtensions)
          .replace(/provider\s+= "prisma-client-js"/, "provider = \"prisma-client-js\"\n  previewFeatures = [\"postgresqlExtensions\"]")
          // Add postgres extensions
          .replace(/provider\s+= "postgresql"/, "provider = \"postgresql\"\n  extensions = [pg_trgm]");
      },
    },
    lists,
    ...isDev ? {} : { session },
    telemetry: false,
    extendGraphqlSchema,
    storage: { // TODO: update keystone config
      resume_storage: {
        kind: "s3",
        type: "file",
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5000 },
        endpoint: s3Url,
        forcePathStyle: true,
      },
    },
    ui: {
      publicPages: ["/signin"],
      isAccessAllowed: isDev ? () => true : context => {
        const session = context.session;
        if (!session || !session.item) return false;
        return session.item.roles.some((role: string) => role === "admin");
      },
      async pageMiddleware({ context, basePath }) {
        if (basePath.startsWith("/api") || basePath.startsWith("/auth")) { return; }

        const req = context.req as ExpressRequest | undefined;

        if (!req || req.path.startsWith("/signin")) { return; }
        if (!isDev) {
          if (!context.session) {
            // If not dev mode and no session, redirect to login
            return { kind: "redirect", to: "/signin" };
          }
        }

        //if (!context.session) {
        // If no session, redirect to login
        //return { kind: "redirect", to: "/signin" };
        //}
      },
    },
    server: {
      port: parseInt(process.env.PORT ?? "8000"),
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:8000",
          "http://host.docker.internal:3000",
          "http://host.docker.internal:8000",
          "https://api.makeuc.io",
          "https://makeuc.io",
        ],
        allowedHeaders: ["apollo-require-preflight", "content-type"],
        credentials: true,
        methods: "*",
      },
      maxFileSize: 50 * 1024 * 1024,
      extendExpressApp,
    },
  }),
);
