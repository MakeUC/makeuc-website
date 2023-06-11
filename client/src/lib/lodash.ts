import { debounce as _debounce } from "lodash";

import { Config } from "~/constants/config";

import type { DebouncedFunc } from "lodash";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<Func extends (...args: any) => any>(func: Func): DebouncedFunc<Func> {
  return _debounce(func, Config.SearchDebounceWait, { maxWait: Config.SearchMaxDebounceWait });
}