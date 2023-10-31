"use client";

import { isApolloError, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/inputs/input";

import { DisqualifyProjectDocument, GetProjectsDocument } from "../generated/graphql/graphql";

import type { SubmitHandler } from "react-hook-form";


const disqualifyFormSchema = z.object({
  reason: z.string().min(1),
});

export type DisqualifyFormValues = z.infer<typeof disqualifyFormSchema>;

export interface DisqualifyFormProps {
  projectId: string;
  onCancel?: () => void;
}

export function DisqualifyForm({ projectId, onCancel }: DisqualifyFormProps) {
  const { control, handleSubmit } = useForm<DisqualifyFormValues>({
    resolver: zodResolver(disqualifyFormSchema),
  });

  const [disqualifyProject] = useMutation(DisqualifyProjectDocument, { refetchQueries: [GetProjectsDocument] });

  const onSubmit = useCallback<SubmitHandler<DisqualifyFormValues>>(formValues => {
    const { reason } = formValues;

    const promise = disqualifyProject({
      variables: {
        reason,
        projectId,
      },
    });

    toast.promise(promise, {
      loading: "Disqualifying project...",
      success: "Project disqualified.",
      error: error => {
        if (isApolloError(error) && error.message.includes("judgeProjectCompoundKey")) {
          return "You have already submitted a judgement.";
        }
        return "Error occurred when submitting disqualification.";
      },
    }, {
      duration: 10000,
    })
      .then(() => { onCancel?.(); });
  }, [onCancel, projectId, disqualifyProject]);

  return (

    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} label="Reason" name="reason" placeholder="Enter Reason" />
      <div className="flex justify-center gap-2 md:justify-end md:col-span-2">
        <Button className="bg-muted-gray-foreground" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Disqualify Project</Button>
      </div>
    </form>
  );
}