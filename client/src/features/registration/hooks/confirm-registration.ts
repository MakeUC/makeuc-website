import { useMutation } from "@apollo/client";
import { useCallback } from "react";

import { VerifyRegistrantDocument } from "../generated/graphql/graphql";


export function useConfirmRegistration() {
  const [verifyRegistrant] = useMutation(VerifyRegistrantDocument);

  const confirmRegistration = useCallback((id: string) => {
    return verifyRegistrant({
      variables: { id },
    });
  }, [verifyRegistrant]);

  return {
    confirmRegistration,
  };
}