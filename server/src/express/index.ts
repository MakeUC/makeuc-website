import { apiRouter } from "./api";
import { makeContextMiddleware } from "./utils";

import type { Context } from ".keystone/types";
import type { Express } from "express";


export function extendExpressApp(app: Express, context: Context) {
  app.use(makeContextMiddleware(context));

  app.use("/api", apiRouter);
}