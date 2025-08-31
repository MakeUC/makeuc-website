"use client";
import { isApolloError, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
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

import { MAKEUC_CODE_OF_CONDUCT, MAKEUC_HACKATHON_RULES, MAKEUC_LIABILITY_RELEASE } from "../constants/makeuc-copy";
import { MLH_CODE_OF_CONDUCT, MLH_EMAILS, MLH_PRIVACY_POLICY } from "../constants/mlh-copy";
import { 
  COUNTRY_OPTIONS, 
  DEGREE_OPTIONS, 
  ETHNICITY_OPTIONS, 
  GENDER_OPTIONS, 
  PARTICIPATION_OPTIONS, 
  TSHIRT_SIZE_OPTIONS, 
  MAJOR_OPTIONS,
} from "../constants/select-options";
import { CreateRegistrantDocument } from "../generated/graphql/graphql";

import { SchoolCombobox } from "./school-selector";


const currentYear = new Date().getFullYear();
const GRADUATION_YEAR_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  key: (currentYear + i).toString(),
  value: (currentYear + i).toString(),
  label: (currentYear + i).toString(),
}));

const registrationFormSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email().min(5),
    age: z.preprocess(
      val => val === "" ? undefined : Number(val),
      z.number().min(1),
    ),
    gender: z.string().min(1),
    ethnicity: z.string().min(1),
    school: z.string().min(1),
    major: z.string().min(1),
    degree: z.string().min(1),
    country: z.string().min(1),
    expectedGraduationYear: z.string().min(1),
    participationPreference: z.string().min(1),
    tshirtSize: z.string().min(1),
    foodSuggestions: z.string().optional(),
    foodAllergy: z.string().optional(),
    resume: z.custom<FileList>(file => file instanceof FileList).optional(),
    hackathonsAttended: z.preprocess(
      val => val === "" ? undefined : Number(val),
      z.number().optional(),
    ),
    notes: z.string().optional(),
    mlhCodeOfConductAgreement: z.literal<boolean>(true, {
      errorMap: () => ({ message: "You must accept the MLH Code of Conduct." }),
    }),
    mlhPrivacyPolicyAgreement: z.literal<boolean>(true, {
      errorMap: () => ({ message: "You must accept the MLH Privacy Policy." }),
    }),
    mlhEmailAgreement: z.boolean().optional(),
    makeucCodeOfConduct: z.literal<boolean>(true, {
      errorMap: () => ({
        message: "You must accept the MakeUC Code of Conduct.",
      }),
    }),
    makeucHackathonRules: z.literal<boolean>(true, {
      errorMap: () => ({
        message: "You must accept the MakeUC Hackathon Rules.",
      }),
    }),
    makeucLiabilityRelease: z.literal<boolean>(true, {
      errorMap: () => ({
        message: "You must accept the MakeUC Liability Release.",
      }),
    }),
    acceptAllAuthorization: z.literal<boolean>(true, {
      errorMap: () => ({ message: "You must accept all authorizations." }),
    }),
  });

export type RegistrationFormEditValues  = Omit<z.infer<typeof registrationFormSchema>, "age" | "hackathonsAttended"> & {
  // the string is for default values to prevent uncontrolled input warnings.
  age: string | number;
  hackathonsAttended?: string | number;
};

export function RegistrationFormEdit() {
  const { control, handleSubmit, setValue, watch } =
    useForm<RegistrationFormEditValues>({
      resolver: zodResolver(registrationFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: undefined,
        ethnicity: undefined,
        school: undefined,
        major: undefined,
        degree: undefined,
        country: undefined,
        expectedGraduationYear: undefined,
        participationPreference: undefined,
        tshirtSize: undefined,
        foodSuggestions: "",
        foodAllergy: "",
        resume: undefined,
        hackathonsAttended: "",
        notes: "",
        mlhCodeOfConductAgreement: false,
        mlhPrivacyPolicyAgreement: false,
        mlhEmailAgreement: false,
        makeucCodeOfConduct: false,
        makeucHackathonRules: false,
        makeucLiabilityRelease: false,
        acceptAllAuthorization: false,
      },
    });

  const { push } = useRouter();
  const [createRegistrant] = useMutation(CreateRegistrantDocument);

  const onSubmit = useCallback(async (formValues: RegistrationFormEditValues) => {
    const { school, expectedGraduationYear, age, hackathonsAttended, ...values } = formValues;
    
    let resume = values.resume?.[0];
    if(resume){
      const specificFileName =  `${values.major}-${values.firstName.trim().toLowerCase()}-${values.lastName.trim().toLowerCase()}-resume`;
      resume = new File([resume], specificFileName, {
        type: resume.type,
      });
    }

    const promise = createRegistrant({
      variables: {
        data: {
          ...values,
          age: age === "" ? undefined : Number(age),
          hackathonsAttended: hackathonsAttended === "" ? undefined : Number(hackathonsAttended),
          expectedGraduationYear: parseInt(expectedGraduationYear),
          resume: resume
            ? {
              upload: resume,
            }
            : undefined,
          school:
             { connect: { id: school } },
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
    }).then(() => push("/"));
  }, [createRegistrant, push]);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-[auto,_1fr] gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSection
        name="Registrant Information"
        description="This information allows us to update you with the latest information about MakeUC."
      >
        <FormGroup>
          <Input
            control={control}
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
          />
          <Input
            control={control}
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
          />
        </FormGroup>
        <Input
          control={control}
          label="Email"
          name="email"
          placeholder="Enter Email"
        />
        <FormGroup>
          <InputNumber
            control={control}
            label="Age"
            name="age"
            placeholder="Enter Age"
          />
          <Select
            control={control}
            label="Gender"
            name="gender"
            placeholder="Enter Gender"
            options={GENDER_OPTIONS}
          />
        </FormGroup>
        <Select
          control={control}
          label="Ethnicity"
          name="ethnicity"
          placeholder="Enter Ethnicity"
          options={ETHNICITY_OPTIONS}
        />
      </FormSection>
      {/*
        Note: We use manual margin (mt-8) instead of flex gap for this section because
        the animated manual school input must not take up space when hidden. Using gap
        would always reserve space for the hidden element, breaking the animation effect.
      */}
      <FormSection
        name="Education"
        description="Based on your current academic institution and what degree you are working towards."
      >
        <div className="flex flex-col">
          <SchoolCombobox control={control} name="school" />
          <FormGroup className="mt-8">
            <Combobox
              control={control as any} // eslint-disable-line @typescript-eslint/no-explicit-any
              label="Major(s)"
              name="major"
              placeholder="Select Major"
              options={MAJOR_OPTIONS.map(m => ({
                key: m,
                value: m,
                label: m,
              }))}
            />
            <Select
              control={control}
              label="Degree"
              name="degree"
              placeholder="Select Degree"
              options={DEGREE_OPTIONS}
            />
          </FormGroup>
          <div className="mt-8">
            <Combobox
              control={control as any} // eslint-disable-line @typescript-eslint/no-explicit-any
              label="Country"
              name="country"
              placeholder="Select Country"
              options={COUNTRY_OPTIONS}
            />
          </div>
          <div className="mt-8">
            <Select
              control={control}
              label="Expected Graduation Year"
              name="expectedGraduationYear"
              placeholder="Select Expected Graduation Year"
              options={GRADUATION_YEAR_OPTIONS}
            />
          </div>
        </div>
      </FormSection>
      <FormSection
        name="In Person"
        description="Let us know your preferences for in-person participation. In person spots will be first-come-first serve. Keep a lookout for a confirmation email at a later date."
      >
        <FormGroup>
          <Select
            control={control}
            label="Participation Preference"
            name="participationPreference"
            placeholder="Select Preference"
            options={PARTICIPATION_OPTIONS}
          />
          <Select
            control={control}
            label="T-Shirt Size"
            name="tshirtSize"
            placeholder="Select T-Shirt Size"
            options={TSHIRT_SIZE_OPTIONS}
          />
        </FormGroup>
        <Input
          control={control}
          label="Food Suggestions"
          name="foodSuggestions"
          placeholder="Enter any food suggestions"
        />
        <Input
          control={control}
          label="Food Allergy"
          name="foodAllergy"
          placeholder="Mention any allergies"
        />
      </FormSection>
      <FormSection
        name="Additional Details"
        description="All of these fields are optional and you can fill in as much or as little detail as you would like."
      >
        <FileUpload
          control={control}
          label="Resume"
          name="resume"
          placeholder="Select Resume"
        />
        <InputNumber
          control={control}
          label="Number of Hackathons Attended"
          name="hackathonsAttended"
          placeholder="Enter Number of Hackathons Attended"
        />
        <TextArea
          control={control}
          label="Additional Notes"
          name="notes"
          placeholder="Enter Additional Notes"
        />
      </FormSection>
      <FormSection
        name="Authorization"
        description="Please review and accept the following required agreements to participate in MakeUC."
      >
        <div className="mb-4 flex flex-col gap-4">
          <div className="font-semibold mb-1">MLH</div>
          <div className="flex flex-col gap-4">
            <Checkbox
              control={control}
              label={MLH_CODE_OF_CONDUCT}
              name="mlhCodeOfConductAgreement"
            />
            <Checkbox
              control={control}
              label={MLH_PRIVACY_POLICY}
              name="mlhPrivacyPolicyAgreement"
            />
            <Checkbox
              control={control}
              label={MLH_EMAILS}
              name="mlhEmailAgreement"
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-4">
          <div className="font-semibold mb-1">MakeUC</div>
          <div className="flex flex-col gap-4">
            <Checkbox
              control={control}
              label={MAKEUC_CODE_OF_CONDUCT}
              name="makeucCodeOfConduct"
            />
            <Checkbox
              control={control}
              label={MAKEUC_HACKATHON_RULES}
              name="makeucHackathonRules"
            />
            <Checkbox
              control={control}
              label={MAKEUC_LIABILITY_RELEASE}
              name="makeucLiabilityRelease"
            />
          </div>
        </div>
        <div className="mt-4">
          <Checkbox
            control={control}
            label="accept all required"
            name="acceptAllAuthorization"
          />
        </div>
      </FormSection>
      <div className="flex justify-center md:justify-end md:col-span-2">
        <Button type="submit">Submit Registration</Button>
      </div>
    </form>
  );
}

export default RegistrationFormEdit;