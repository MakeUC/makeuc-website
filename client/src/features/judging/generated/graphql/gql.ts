/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation SubmitJudgement($data: JudgementCreateInput!) {\n  createJudgement(data: $data) {\n    id\n  }\n}\n\nmutation DisqualifyProject($projectId: ID!, $reason: String!) {\n  disqualifyProject(projectId: $projectId, reason: $reason) {\n    id\n  }\n}": types.SubmitJudgementDocument,
    "query GetProjects($where: ProjectWhereInput! = {}, $skip: Int! = 0, $take: Int = 100, $orderBy: [ProjectOrderByInput!]! = [], $cursor: ProjectWhereUniqueInput) {\n  projects(\n    where: $where\n    skip: $skip\n    take: $take\n    orderBy: $orderBy\n    cursor: $cursor\n  ) {\n    id\n    url\n    name\n    countJudgements\n    judgingGroup\n    year\n    score\n    disqualified\n    applicableTracks\n  }\n  projectsCount(where: $where)\n}": types.GetProjectsDocument,
    "query GetTracks($where: TrackWhereInput, $skip: Int! = 0, $take: Int = 20, $orderBy: [TrackOrderByInput!]! = [], $cursor: TrackWhereUniqueInput) {\n  tracks(\n    where: $where\n    skip: $skip\n    take: $take\n    orderBy: $orderBy\n    cursor: $cursor\n  ) {\n    name\n  }\n}": types.GetTracksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SubmitJudgement($data: JudgementCreateInput!) {\n  createJudgement(data: $data) {\n    id\n  }\n}\n\nmutation DisqualifyProject($projectId: ID!, $reason: String!) {\n  disqualifyProject(projectId: $projectId, reason: $reason) {\n    id\n  }\n}"): (typeof documents)["mutation SubmitJudgement($data: JudgementCreateInput!) {\n  createJudgement(data: $data) {\n    id\n  }\n}\n\nmutation DisqualifyProject($projectId: ID!, $reason: String!) {\n  disqualifyProject(projectId: $projectId, reason: $reason) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProjects($where: ProjectWhereInput! = {}, $skip: Int! = 0, $take: Int = 100, $orderBy: [ProjectOrderByInput!]! = [], $cursor: ProjectWhereUniqueInput) {\n  projects(\n    where: $where\n    skip: $skip\n    take: $take\n    orderBy: $orderBy\n    cursor: $cursor\n  ) {\n    id\n    url\n    name\n    countJudgements\n    judgingGroup\n    year\n    score\n    disqualified\n    applicableTracks\n  }\n  projectsCount(where: $where)\n}"): (typeof documents)["query GetProjects($where: ProjectWhereInput! = {}, $skip: Int! = 0, $take: Int = 100, $orderBy: [ProjectOrderByInput!]! = [], $cursor: ProjectWhereUniqueInput) {\n  projects(\n    where: $where\n    skip: $skip\n    take: $take\n    orderBy: $orderBy\n    cursor: $cursor\n  ) {\n    id\n    url\n    name\n    countJudgements\n    judgingGroup\n    year\n    score\n    disqualified\n    applicableTracks\n  }\n  projectsCount(where: $where)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTracks($where: TrackWhereInput, $skip: Int! = 0, $take: Int = 20, $orderBy: [TrackOrderByInput!]! = [], $cursor: TrackWhereUniqueInput) {\n  tracks(\n    where: $where\n    skip: $skip\n    take: $take\n    orderBy: $orderBy\n    cursor: $cursor\n  ) {\n    name\n  }\n}"): (typeof documents)["query GetTracks($where: TrackWhereInput, $skip: Int! = 0, $take: Int = 20, $orderBy: [TrackOrderByInput!]! = [], $cursor: TrackWhereUniqueInput) {\n  tracks(\n    where: $where\n    skip: $skip\n    take: $take\n    orderBy: $orderBy\n    cursor: $cursor\n  ) {\n    name\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;