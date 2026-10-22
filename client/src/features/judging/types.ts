import type { GetProjectsQuery } from "./generated/graphql/graphql";


export type ProjectItem = NonNullable<NonNullable<GetProjectsQuery["projects"]>[number]>;

export type ViewMode = "node" | "cluster" | "table";
export type StatusFilter = "all" | "needs-judging" | "in-review" | "completed" | "disqualified";
export type SortOption =
  | "priority"
  | "name-asc"
  | "name-desc"
  | "group-asc"
  | "score-desc"
  | "judgements-asc"
  | "judgements-desc";
