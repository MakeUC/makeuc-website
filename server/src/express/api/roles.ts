import type { Session } from "../../auth/access";
import type { Context } from ".keystone/types";
import type { Request, Response } from "express";


export enum Role {
  Organizer = "organizer",
  Admin = "admin",
  Judge = "judge",
}

type ReqWithContext = Request & { context: Context<Session> };

/**
 * Ensure the current request is authenticated and the session user has at least one of the allowed roles.
 * Sends a 401 or 403 response when checks fail. Returns true when authorized.
 */

export async function ensureHasRole(req: ReqWithContext, res: Response, allowedRoles: Role[]): Promise<boolean> {
  const userId = req.context.session?.item?.id;
  if (!userId) { res.sendStatus(401); return false; }
  const user = await req.context.prisma.user.findUnique({ where: { id: userId }, select: { roles: true } });
  if (!user) { res.sendStatus(401); return false; }
  const roles = user.roles;
  if (Array.isArray(roles) && allowedRoles.some(r => roles.includes(r))) return true;
  res.sendStatus(403);
  return false;
}

export default Role;
