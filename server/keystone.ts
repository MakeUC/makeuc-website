import { config } from "@keystone-6/core";

import { withAuth, session } from "./src/auth";
import { extendExpressApp } from "./src/express";
import { extendGraphqlSchema } from "./src/graphql";
import { lists } from "./src/schema";


const {
  S3_BUCKET_NAME: bucketName = "resumes",
  S3_REGION: region = "us-east-2",
  S3_ACCESS_KEY_ID: accessKeyId = "minioadmin",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "minioadmin",
  S3_URL: s3Url = "http://minio:9000",
} = process.env;

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
    session,
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
    server: {
      port: parseInt(process.env.PORT ?? "8000"),
      cors: {
        origin: "*",
        allowedHeaders: "*",
        credentials: true,
        methods: "*",
      },
      maxFileSize: 50 * 1024 * 1024,
      extendExpressApp,
    },
  }),
);
