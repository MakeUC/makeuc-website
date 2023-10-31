"use client";

import { isApolloError, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { InputNumber } from "~/components/ui/inputs/input-number";

import { GetProjectsDocument, SubmitJudgementDocument } from "../generated/graphql/graphql";

import type { SubmitHandler } from "react-hook-form";


const judgementFormSchema = z.object({
  conceptCaliber: z.number().min(0).max(10),
  implementationAttempt: z.number().min(0).max(10),
  demonstrationAbility: z.number().min(0).max(10),
  presentationProfessionalism: z.number().min(0).max(10),
});

export type JudgementFormValues = z.infer<typeof judgementFormSchema>;

export interface JudgementFormProps {
  projectId: string;
  onCancel?: () => void;
}

export function JudgementForm({ projectId, onCancel }: JudgementFormProps) {
  const { control, handleSubmit } = useForm<JudgementFormValues>({
    resolver: zodResolver(judgementFormSchema),
  });

  const [submitJudgement] = useMutation(SubmitJudgementDocument, {
    refetchQueries: [GetProjectsDocument],
  });

  const onSubmit = useCallback<SubmitHandler<JudgementFormValues>>(formValues => {
    const promise = submitJudgement({
      variables: {
        data: {
          ...formValues,
          overallScore: Object.values(formValues).reduce((prev, current) => prev + current, 0),
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      },
    });

    toast.promise(promise, {
      loading: "Submitting Judgement...",
      success: "Judgement submitted successfully.",
      error: error => {
        if (isApolloError(error) && error.message.includes("judgeProjectCompoundKey")) {
          return "You have already submitted a judgement.";
        }
        return "Error occurred when submitting judgement.";
      },
    }, {
      duration: 10000,
    })
      .then(() => { onCancel?.(); });
  }, [onCancel, projectId, submitJudgement]);

  return (

    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <InputNumber control={control} label="Concept Caliber" name="conceptCaliber" placeholder="Enter Concept Caliber" />
      <InputNumber control={control} label="Implementation Attempt" name="implementationAttempt" placeholder="Enter Implementation Attempt" />
      <InputNumber control={control} label="Demonstration Ability" name="demonstrationAbility" placeholder="Enter Demonstration Ability" />
      <InputNumber control={control} label="Presentation Professionalism" name="presentationProfessionalism" placeholder="Enter Presentation Professionalism" />
      <div className="flex justify-center gap-2 md:justify-end md:col-span-2">
        <Button className="bg-muted-gray-foreground" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit Judgment</Button>
      </div>
    </form>
  );
}