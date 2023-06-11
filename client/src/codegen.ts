import { readdirSync, statSync } from "fs";

import type { CodegenConfig } from "@graphql-codegen/cli";


function walk(dir: string, predicate: (path: string) => boolean): string[] {
  if (!statSync(dir).isDirectory()) {
    return predicate(dir) ? [dir] : [];
  }
  const files = readdirSync(dir);
  return files.flatMap(file => walk(`${dir}/${file}`, predicate));
}

function findGraphQLDirectories() {
  const graphqlFiles = walk(__dirname, path => path.includes("lib/graphql"));
  const parentDirs = new Set(graphqlFiles.map(file => file.split("/").slice(0, -3).join("/")));

  return parentDirs;
}

const config: CodegenConfig = {
  schema: `${__dirname}/../../server/schema.graphql`,
  ignoreNoDocuments: true,
  generates: Object.fromEntries(
    Array.from(findGraphQLDirectories().values())
      .map(dirPath => [`${dirPath}/generated/graphql/`, {
        preset: "client",
        documents: [`${dirPath}/lib/graphql/*.graphql`],
      }]),
  ),
};

export default config;
