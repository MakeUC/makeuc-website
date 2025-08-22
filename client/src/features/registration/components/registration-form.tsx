"use client";

import { isApolloError, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import { FormGroup, FormSection } from "~/components/ui/form";
import { Checkbox } from "~/components/ui/inputs/checkbox";
import { Combobox } from "~/components/ui/inputs/combobox";
import { FileUpload } from "~/components/ui/inputs/file-upload";
import { Input } from "~/components/ui/inputs/input";
import { InputNumber } from "~/components/ui/inputs/input-number";
import { Select } from "~/components/ui/inputs/select";
import { TextArea } from "~/components/ui/inputs/textarea";

import { MAKEUC_LIABILITY_WAIVER, MAKEUC_PHOTO_RELEASE } from "../constants/makeuc-copy";
import { MLH_CODE_OF_CONDUCT, MLH_EMAILS, MLH_PRIVACY_POLICY } from "../constants/mlh-copy";
import { COUNTRY_OPTIONS, DEGREE_OPTIONS, ETHNICITY_OPTIONS, GENDER_OPTIONS } from "../constants/select-options";
import { CreateRegistrantDocument } from "../generated/graphql/graphql";

import { SchoolCombobox } from "./school-selector";

import type { SubmitHandler } from "react-hook-form";


const registrationFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(5),
  age: z.number().min(1),
  gender: z.string().min(1),
  ethnicity: z.string().min(1),
  school: z.string().cuid().min(1),
  major: z.string().min(1),
  degree: z.string().min(1),
  country: z.string().min(1),
  expectedGraduationYear: z.number().min(2000),
  resume: z.custom<FileList>(file => file instanceof FileList).optional(),
  hackathonsAttended: z.number().optional(),
  notes: z.string().optional(),
  mlhCodeOfConductAgreement: z.literal<boolean>(true, { errorMap: () => ({ message: "You must accept the MLH Code of Conduct." }) }),
  mlhPrivacyPolicyAgreement: z.literal<boolean>(true, { errorMap: () => ({ message: "You must accept the MLH Privacy Policy." }) }),
  mlhEmailAgreement: z.boolean().optional(),
  makeucLiabilityWaiver: z.literal<boolean>(true, { errorMap: () => ({ message: "You must accept the MakeUC Liability Waiver." }) }),
  makeucPhotoRelease: z.literal<boolean>(true, { errorMap: () => ({ message: "You must accept the MakeUC Photo Release." }) }),
  acceptAllAuthorization: z.literal<boolean>(true, { errorMap: () => ({ message: "You must accept all authorizations." }) }),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;


export function RegistrationForm() {
  const { control, handleSubmit, setValue, watch } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
  });

  // Watch all relevant checkboxes
  const mlhCodeOfConductAgreement = watch("mlhCodeOfConductAgreement");
  const mlhPrivacyPolicyAgreement = watch("mlhPrivacyPolicyAgreement");
  const makeucLiabilityWaiver = watch("makeucLiabilityWaiver");
  const makeucPhotoRelease = watch("makeucPhotoRelease");
  const acceptAllAuthorization = watch("acceptAllAuthorization");
  // Optional checkbox
  const mlhEmailAgreement = watch("mlhEmailAgreement");

  // When acceptAllAuthorization is toggled, set all others
  // Only set all checkboxes when acceptAllAuthorization is toggled directly
  useEffect(() => {
    // If the user toggles 'accept all' ON, set all required to true
    if (acceptAllAuthorization) {
      setValue("mlhCodeOfConductAgreement", true);
      setValue("mlhPrivacyPolicyAgreement", true);
      setValue("makeucLiabilityWaiver", true);
      setValue("makeucPhotoRelease", true);
    }
    // If the user toggles 'accept all' OFF, set all required to false ONLY if all were previously checked
    else if (
      mlhCodeOfConductAgreement &&
      mlhPrivacyPolicyAgreement &&
      makeucLiabilityWaiver &&
      makeucPhotoRelease
    ) {
      setValue("mlhCodeOfConductAgreement", false);
      setValue("mlhPrivacyPolicyAgreement", false);
      setValue("makeucLiabilityWaiver", false);
      setValue("makeucPhotoRelease", false);
    }
    // Otherwise, do nothing (prevents loop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptAllAuthorization, setValue]);

  // If any individual is unchecked, uncheck acceptAllAuthorization
  useEffect(() => {
    if (
      mlhCodeOfConductAgreement &&
      mlhPrivacyPolicyAgreement &&
      makeucLiabilityWaiver &&
      makeucPhotoRelease
    ) {
      setValue("acceptAllAuthorization", true);
    } else {
      setValue("acceptAllAuthorization", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mlhCodeOfConductAgreement, mlhPrivacyPolicyAgreement, makeucLiabilityWaiver, makeucPhotoRelease]);

  const { push } = useRouter();

  const [createRegistrant] = useMutation(CreateRegistrantDocument);

  const onSubmit = useCallback<SubmitHandler<RegistrationFormValues>>(formValues => {
    const { school, ...values } = formValues;

    const promise = createRegistrant({
      variables: {
        data: {
          ...values,
          resume: !!values.resume?.[0] ? {
            upload: values.resume[0],
          } : undefined,
          school: { connect: { id: school } },
        },
      },
    });

    toast.promise(promise, {
      loading: "Submitting Registration...",
      success: "You have registered successfully! Please check your email for the confirmation link.",
      error: error => {
        if (isApolloError(error) && error.message.includes("emailRegistrationYearCompoundKey")) {
          return "You have already registered.\nPlease check your email for the confirmation link or reach out to us at info@makeuc.io";
        }
        return "Unknown Error";
      },
    }, {
      duration: 10000,
    })
      // TODO: Change to a "registration successful" page
      .then(() => push("/"));
  }, [createRegistrant, push]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-[auto,_1fr] gap-8" onSubmit={handleSubmit(onSubmit)}>
      <FormSection name="Registrant Information" description="This information allows us to update you with the latest information about MakeUC.">
        <FormGroup>
          <Input control={control} label="First Name" name="firstName" placeholder="Enter First Name" />
          <Input control={control} label="Last Name" name="lastName" placeholder="Enter Last Name" />
        </FormGroup>
        <Input control={control} label="Email" name="email" placeholder="Enter Email" />
        <FormGroup>
          <InputNumber control={control} label="Age" name="age" placeholder="Enter Age" />
          <Select control={control} label="Gender" name="gender" placeholder="Enter Gender" options={GENDER_OPTIONS} />
        </FormGroup>
        <Select control={control} label="Ethnicity" name="ethnicity" placeholder="Enter Ethnicity" options={ETHNICITY_OPTIONS} />
      </FormSection>
      <FormSection name="Education" description="Based on your current academic institution and what degree you are working towards.">
        <SchoolCombobox control={control} name="school" />
        <FormGroup>
          <Input control={control} label="Major(s)" name="major" placeholder="Enter Major" />
          <Select control={control} label="Degree" name="degree" placeholder="Select Degree" options={DEGREE_OPTIONS} />
        </FormGroup>
        <Combobox control={control} label="Country" name="country" placeholder="Select Country" options={COUNTRY_OPTIONS} />
        <InputNumber control={control} label="Expected Graduation Year" name="expectedGraduationYear" placeholder="Enter Expected Graduation Year" />
      </FormSection>
      <FormSection name="Additional Details" description="All of these fields are optional and you can fill in as much or as little detail as you would like.">
        <FileUpload control={control} label="Resume" name="resume" placeholder="Select Resume" />
        <InputNumber control={control} label="Number of Hackathons Attended" name="hackathonsAttended" placeholder="Enter Number of Hackathons Attended" />
        <TextArea control={control} label="Additional Notes" name="notes" placeholder="Enter Additional Notes" />
      </FormSection>
      <FormSection name="Authorization" description="Please review and accept the following required agreements to participate in MakeUC.">
        <div className="mb-4 flex flex-col gap-4">
          <div className="font-semibold mb-1">MLH</div>
          <div className="flex flex-col gap-4">
            <Checkbox control={control} label={MLH_CODE_OF_CONDUCT} name="mlhCodeOfConductAgreement" />
            <Checkbox control={control} label={MLH_PRIVACY_POLICY} name="mlhPrivacyPolicyAgreement" />
            <Checkbox control={control} label={MLH_EMAILS} name="mlhEmailAgreement" />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-4">
          <div className="font-semibold mb-1">MakeUC</div>
          <div className="flex flex-col gap-4">
            <Checkbox control={control} label={<span dangerouslySetInnerHTML={{ __html: MAKEUC_LIABILITY_WAIVER }} />} name="makeucLiabilityWaiver" />
            <Checkbox control={control} label={<span dangerouslySetInnerHTML={{ __html: MAKEUC_PHOTO_RELEASE }} />} name="makeucPhotoRelease" />
          </div>
        </div>
        <div className="mt-4">
          <Checkbox control={control} label="accept all required" name="acceptAllAuthorization" />
        </div>
      </FormSection>
      <div className="flex justify-center md:justify-end md:col-span-2">
        <Button type="submit">Submit Registration</Button>
      </div>
    </form>
  );
}
