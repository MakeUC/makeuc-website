import { config } from "@keystone-6/core";

import { withAuth, session } from "./src/auth";
import { extendExpressApp } from "./src/express";
import { extendGraphqlSchema } from "./src/graphql";
import { lists } from "./src/schema";


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
    // storage: { // TODO: update keystone config

    // },
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
