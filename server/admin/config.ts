import { CustomNavigation } from "./components/CustomNavigation";

import type { AdminConfig } from "@keystone-6/core/types";


export const components: AdminConfig["components"] = {
  Navigation: CustomNavigation,
};