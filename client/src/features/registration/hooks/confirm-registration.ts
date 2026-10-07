import { useMutation } from "@apollo/client";
import { useCallback } from "react";

import { VerifyRegistrantDocument } from "../generated/graphql/graphql";


export function useConfirmRegistration() {
  const [verifyRegistrant] = useMutation(VerifyRegistrantDocument);

  const confirmRegistration = useCallback((token: string) => {
    return verifyRegistrant({
      variables: { token },
    });
  }, [verifyRegistrant]);

  return {
    confirmRegistration,
  };
}