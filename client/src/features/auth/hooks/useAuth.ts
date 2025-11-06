"use client";

import { gql, useQuery } from "@apollo/client";


const GetSessionDocument = gql`
  query GetSession {
    session {
      item {
        roles
      }
    }
  }
`;

export function useAuth() {
  const { data, loading } = useQuery(GetSessionDocument);
  
  const roles = data?.session?.item?.roles ?? [];
  const isAdmin = roles.includes("admin");
  const isJudge = roles.includes("judge");
  const isOrganizer = roles.includes("organizer");
  const isAuthenticated = roles.length > 0;

  return {
    roles,
    isAdmin,
    isJudge,
    isOrganizer,
    isAuthenticated,
    loading,
  };
}