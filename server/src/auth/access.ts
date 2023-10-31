import type { KeystonePassportUserType } from "./passport";
import type { TypeInfo, Context, UserRoleType } from ".keystone/types";
import type { AccessOperation } from "@keystone-6/core/dist/declarations/src/types/config/access-control";
import type { BaseListTypeInfo, ListOperationAccessControl, MaybePromise } from "@keystone-6/core/types";


type UserItem = TypeInfo["lists"]["User"]["item"];

export interface Session extends KeystonePassportUserType {
  item: Omit<UserItem, "roles"> & {
    roles: UserRoleType[]
  };
}

interface AccessArgs {
  context: Context;
  session?: TypeInfo<Session>["session"];
  listKey: keyof TypeInfo<Session>["lists"];
  operation: AccessOperation;
}

type AccessPredicate = (args: AccessArgs) => MaybePromise<boolean>;

export function isAuthenticated(args: AccessArgs) {
  return !!args.session;
}

export function hasRoleOneOf(...roles: UserRoleType[]) {
  return (args: AccessArgs) => {
    const session = args.session;
    if (!session) return false;

    return session.item.roles.some(role => roles.includes(role));
  };
}

export function everyPredicate(...predicates: AccessPredicate[]): AccessPredicate {
  return args => predicates.every(predicate => predicate(args));
}

export function somePredicate(...predicates: AccessPredicate[]): AccessPredicate {
  return args => predicates.some(predicate => predicate(args));
}

export function allOperations(predicate: AccessPredicate) {
  return {
    create: predicate as ListOperationAccessControl<"create", BaseListTypeInfo>,
    query: predicate as ListOperationAccessControl<"query", BaseListTypeInfo>,
    update: predicate as ListOperationAccessControl<"update", BaseListTypeInfo>,
    delete: predicate as ListOperationAccessControl<"delete", BaseListTypeInfo>,
  };
}