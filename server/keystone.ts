import { config } from "@keystone-6/core";

import { withAuth, session } from "./src/auth";
import { lists } from "./src/schema";


export default withAuth(
  config({
    db: {
      provider: "postgresql",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url: process.env.POSTGRES_PRISMA_URL!,
      shadowDatabaseUrl: process.env.POSTGRES_URL_NON_POOLING,
      idField: { kind: "cuid" },
    },
    lists,
    session,
    telemetry: false,
    server: {
      port: parseInt(process.env.PORT ?? "8000"),
      cors: {
        origin: "*",
        allowedHeaders: "*",
        credentials: true,
        methods: "*",
      },
    },
  }),
);
