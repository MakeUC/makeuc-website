"use client";

import { isApolloError, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
import { useCountryCityOptions } from "~/hooks/useCountryCityOptions";

import {
  MAKEUC_CODE_OF_CONDUCT,
  MAKEUC_HACKATHON_RULES,
  MAKEUC_LIABILITY_RELEASE,
} from "../constants/makeuc-copy";
import {
  MLH_CODE_OF_CONDUCT,
  MLH_EMAILS,
  MLH_PRIVACY_POLICY,
} from "../constants/mlh-copy";
import {
  COUNTRY_OPTIONS,
  DEGREE_OPTIONS,
  ETHNICITY_OPTIONS,
  GENDER_OPTIONS,
  MAJOR_OPTIONS,
  PARTICIPATION_OPTIONS,
  TSHIRT_SIZE_OPTIONS,
} from "../constants/select-options";
import { CreateRegistrantDocument } from "../generated/graphql/graphql";

import styles from "./registration-form.module.css";
import { SchoolCombobox } from "./school-selector";

// Graduation year dropdown options
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
    manualSchoolEntry: z.string().optional(),
    manualSchoolCity: z.string().optional(),
    manualSchoolCountry: z.string().optional(),
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
  })
  .refine(
    data => {
      return data.school !== "other" || !!data.manualSchoolEntry?.trim();
    },
    {
      path: ["manualSchoolEntry"],
      message: "Please enter your school name if it’s not listed.",
    },
  );

export type RegistrationFormValues = Omit<z.infer<typeof registrationFormSchema>, "age" | "hackathonsAttended"> & {
  // the string is for default values to prevent uncontrolled input warnings.
  age: string | number;
  hackathonsAttended?: string | number;
};

export function RegistrationForm() {
  const { control, handleSubmit, setValue, watch } =
    useForm<RegistrationFormValues>({
      resolver: zodResolver(registrationFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: undefined,
        ethnicity: undefined,
        school: undefined,
        manualSchoolEntry: "",
        manualSchoolCity: "",
        manualSchoolCountry: "",
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

  const manualSchoolCountry = watch("manualSchoolCountry");
  const { countries, cities, loading } = useCountryCityOptions(undefined);
  // Find the selected country object to get its id
  const selectedCountry = countries?.find((c: { name: string }) => c.name === manualSchoolCountry);
  const { cities: filteredCities, loading: loadingCities } = useCountryCityOptions(selectedCountry?.id);
  const countryOptions = countries.map((c: { code?: string; name: string; iso2?: string; id?: number }) => ({
    key: c.id !== undefined ? `${c.id}-${c.name}` : c.code || c.name || c.iso2 || c.id || Math.random().toString(36),
    value: c.name,
    label: c.name,
    id: c.id,
  }));
  const cityOptions = (filteredCities || []).map((c: { id?: number; name: string }) => ({
    key: c.id !== undefined ? `${c.id}-${c.name}` : c.name || Math.random().toString(36),
    value: c.name,
    label: c.name,
    id: c.id,
  }));

  // Animation state for manual school input
  const schoolValue = watch("school");
  // Only need to track if the input was ever focused, to avoid clearing value on hide
  const [manualInputTouched, setManualInputTouched] = useState(false);
  useEffect(() => {
    if (schoolValue === "other") {
      setManualInputTouched(true);
    }
  }, [schoolValue]);

  // Watch all relevant checkboxes
  const mlhCodeOfConductAgreement = watch("mlhCodeOfConductAgreement");
  const mlhPrivacyPolicyAgreement = watch("mlhPrivacyPolicyAgreement");
  const makeucCodeOfConduct = watch("makeucCodeOfConduct");
  const makeucHackathonRules = watch("makeucHackathonRules");
  const makeucLiabilityRelease = watch("makeucLiabilityRelease");
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
      setValue("makeucCodeOfConduct", true);
      setValue("makeucHackathonRules", true);
      setValue("makeucLiabilityRelease", true);
    }
    // If the user toggles 'accept all' OFF, set all required to false ONLY if all were previously checked
    else if (
      mlhCodeOfConductAgreement &&
      mlhPrivacyPolicyAgreement &&
      makeucCodeOfConduct &&
      makeucHackathonRules &&
      makeucLiabilityRelease
    ) {
      setValue("mlhCodeOfConductAgreement", false);
      setValue("mlhPrivacyPolicyAgreement", false);
      setValue("makeucCodeOfConduct", false);
      setValue("makeucHackathonRules", false);
      setValue("makeucLiabilityRelease", false);
    }
    // Otherwise, do nothing (prevents loop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptAllAuthorization, setValue]);

  // If any individual is unchecked, uncheck acceptAllAuthorization
  useEffect(() => {
    if (
      mlhCodeOfConductAgreement &&
      mlhPrivacyPolicyAgreement &&
      makeucCodeOfConduct &&
      makeucHackathonRules &&
      makeucLiabilityRelease
    ) {
      setValue("acceptAllAuthorization", true);
    } else {
      setValue("acceptAllAuthorization", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mlhCodeOfConductAgreement,
    mlhPrivacyPolicyAgreement,
    makeucCodeOfConduct,
    makeucHackathonRules,
    makeucLiabilityRelease,
  ]);

  const { push } = useRouter();

  const [createRegistrant] = useMutation(CreateRegistrantDocument);

  const onSubmit = useCallback(
    (formValues: RegistrationFormValues) => {
      const { school, manualSchoolEntry, expectedGraduationYear, age, hackathonsAttended, ...values } =
        formValues;

      const promise = createRegistrant({
        variables: {
          data: {
            ...values,
            age: age === "" ? undefined : Number(age),
            hackathonsAttended: hackathonsAttended === "" ? undefined : Number(hackathonsAttended),
            expectedGraduationYear: parseInt(expectedGraduationYear),
            resume: !!values.resume?.[0]
              ? {
                upload: values.resume[0],
              }
              : undefined,
            school:
              school === "other"
                ? { create: { name: manualSchoolEntry || "Unnamed School" } }
                : { connect: { id: school } },
          },
        },
      });

      toast
        .promise(
          promise,
          {
            loading: "Submitting Registration...",
            success:
              "You have registered successfully! Please check your email for the confirmation link.",
            error: error => {
              if (
                isApolloError(error) &&
                error.message.includes("emailRegistrationYearCompoundKey")
              ) {
                return "You have already registered.\nPlease check your email for the confirmation link or reach out to us at info@makeuc.io";
              }
              return "Unknown Error";
            },
          },
          {
            duration: 10000,
          },
        )
        // TODO: Change to a "registration successful" page
        .then(() => push("/"));
    },
    [createRegistrant, push],
  );

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
          <div
            className={`transition-all duration-200 ${
              schoolValue === "other"
                ? "opacity-100 translate-y-0 h-auto mt-8"
                : "opacity-0 -translate-y-2 pointer-events-none h-0 m-0"
            }`}
            style={{ willChange: "opacity, transform, height" }}
          >
            {(schoolValue === "other" || manualInputTouched) && (
              <div className="flex flex-col gap-4">
                <div className="font-semibold text-lg mb-2">Add a New School</div>
                <p>
                  Do not add new <i>highschools</i> here. 
                  Instead, use the highschool option in the above school input.
                </p>
                <Input
                  control={control}
                  label="School Name"
                  name="manualSchoolEntry"
                  placeholder="Type your school name"
                />
                <div className="flex gap-4">
                  <Combobox
                    control={control}
                    label="School Country"
                    name="manualSchoolCountry"
                    placeholder="Select a country..."
                    options={countryOptions}
                  />
                  <Combobox
                    control={control}
                    label="School City"
                    name="manualSchoolCity"
                    placeholder={manualSchoolCountry ? "Select a city..." : "Select a country first"}
                    options={cityOptions}
                    disabled={!manualSchoolCountry}
                  />
                </div>
              </div>
            )}
          </div>
          <FormGroup className="mt-8">
            <Combobox
              control={control}
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
              control={control}
              label="Country"
              name="country"
              placeholder="Select Country"
              options={countryOptions}
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
        description="Let us know your preferences for in-person participation."
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
