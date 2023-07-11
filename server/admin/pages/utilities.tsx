import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { Button } from "@keystone-ui/button";
import { Heading, H1, H3 } from "@keystone-ui/core";

import type { FormEventHandler } from "react";


export const gql = ([content]: TemplateStringsArray) => content;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchGraphQL(query: string, variables?: Record<string, any>) {
  return fetch("/api/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: { "Content-Type": "application/json" },
  })
    .then(x => x.json())
    .then(({ data, errors }) => {
      if (errors) {
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          `GraphQL errors occurred:\n${errors.map((x: any) => x.message).join("\n")}`
        );
      }
      return data;
    });
}

async function seedIndiaSchools() {
  await fetchGraphQL(gql`
    mutation {
      seedSchoolIndiaData
    }
`);
}

const importRegistrants: FormEventHandler<HTMLFormElement> = event => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);

  return fetch("/api/utilities/import-registrants", {
    method: "POST",
    body: formData,
  });
};


export default function UtilitiesPage() {
  return (
    <PageContainer header={<Heading type="h3">Utilities</Heading>}>
      <H1>Quick and Easy Utilities!</H1>
      <br />
      <H3>Manual Seeding</H3>
      <br />
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button>Seed US Schools</Button>
        <Button onClick={seedIndiaSchools}>Seed India Schools</Button>
      </div>
      <H3>Import Registrants</H3>
      <br />
      <form onSubmit={importRegistrants}>
        <input type="file" name="file" />
        <Button type="submit" tone="positive">Import Registrants</Button>
      </form>
    </PageContainer>
  );
}