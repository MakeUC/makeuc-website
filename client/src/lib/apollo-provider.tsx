"use client";

import {
  ApolloClient,
  ApolloLink,
  SuspenseCache,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import {
  createUploadLink,
} from "apollo-upload-client";


function makeClient() {
  const httpLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/graphql`,
    headers: { "Apollo-Require-Preflight": "true" },
    credentials: "include",
  }) as unknown as ApolloLink;

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : httpLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}