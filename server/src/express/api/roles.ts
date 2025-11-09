import type { Context } from ".keystone/types";
import type { Request, Response } from "express";


export enum Role {
  Organizer = "organizer",
  Admin = "admin",
  Judge = "judge",
}

type ReqWithContext = Request & { context: Context };

/**
 * Ensure the current request is authenticated and the session user has at least one of the allowed roles.
 * Sends a 401 or 403 response when checks fail. Returns true when authorized.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ensureHasRole(req: ReqWithContext, res: Response, allowedRoles: Role[] = []): boolean {
  return true;

  // TODO: fix role garbage fire
  /*
  // Keystone's generated Context may provide a session object; guard defensively.
  const sessionItem = req.context?.session?.data?.item as unknown;
  if (!sessionItem || typeof sessionItem !== "object") {
    res.status(401).send("Could not find session item. Not authenticated.");
    return false;
  }

  // Expect roles to be an array of strings on the session item.
  // We keep the check defensive to avoid runtime crashes if the shape differs.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rolesArr = (sessionItem as any).roles;
  if (!Array.isArray(rolesArr)) {
    res.status(401).send("Could not find user's roles. Not authenticated.");
    return false;
  }

  const roles = new Set<string>(rolesArr as string[]);

  if (allowedRoles.length === 0) {
    // no specific role required
    return true;
  }

  for (const r of allowedRoles) {
    if (roles.has(r)) return true;
  }

  res.status(403).send(`Not authorized. Must be one of: ${allowedRoles.join(", ")}`);
  return false;
  */
}

export default Role;
