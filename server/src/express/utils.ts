import type { Context } from ".keystone/types";
import type { RequestHandler } from "express";


export function makeContextMiddleware(context: Context) {
  const middleware: RequestHandler = async (req, _, next) => {
    req.context = await context.withRequest(req);
    next();
  };

  return middleware as RequestHandler;
}
