"use client";

import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { PageTitle } from "~/components/general/typography";
import { useConfirmRegistration } from "~/features/registration";


export default function ConfirmRegistrationPage() {
  const { confirmRegistration } = useConfirmRegistration();
  const { get: getSearchParam } = useSearchParams();

  const id = useMemo(() => getSearchParam("id"), [getSearchParam]);
  const [isRegistrationConfirmed, setIsRegistrationConfirmed] = useState<boolean | undefined>(undefined);


  useEffect(() => {
    if (!id || !confirmRegistration) return;

    toast.promise(
      confirmRegistration(id),
      {
        success: "Successfully confirmed registration!",
        error: "Failed to confirm registration.",
        loading: "Confirming registration...",
      },
    )
      .then(() => setIsRegistrationConfirmed(true))
      .catch(() => setIsRegistrationConfirmed(false));
  }, [confirmRegistration, id]);

  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Confirm Registration</PageTitle>
        <hr className="border border-muted-foreground" />
        <div className="mt-4">
          {
            isRegistrationConfirmed === undefined
              ? <i>Confirming Registration <Loader className="animate-spin" /></i>
              : isRegistrationConfirmed
                ? <span>Your registration has been successfully confirmed!</span>
                : <span>Your registration has already been confirmed!</span>
          }
        </div>
      </div>
    </div>);
}