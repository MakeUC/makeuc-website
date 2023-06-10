import type { TypeInfo, Context } from ".keystone/types";
import type { AccessOperation } from "@keystone-6/core/dist/declarations/src/types/config/access-control";
import type { BaseListTypeInfo, ListOperationAccessControl, MaybePromise } from "@keystone-6/core/types";


interface AccessArgs {
  context: Context;
  session?: TypeInfo["session"];
  listKey: keyof TypeInfo["lists"];
  operation: AccessOperation;
}

type AccessPredicate = (args: AccessArgs) => MaybePromise<boolean>;

export function isAuthenticated(args: AccessArgs) {
  return !!args.session;
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