import type { Context } from ".keystone/types";


// to make the file a module and avoid the TypeScript error
export { };

// Override the default express request to include the context
declare global {
  namespace Express {
    export interface Request {
      context: Context;
    }
  }
}