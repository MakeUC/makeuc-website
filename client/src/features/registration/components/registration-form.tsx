"use client";

import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { FormGroup, FormSection } from "~/components/ui/form";
import { Checkbox } from "~/components/ui/inputs/checkbox";
import { Combobox } from "~/components/ui/inputs/combobox";
import { FileUpload } from "~/components/ui/inputs/file-upload";
import { Input } from "~/components/ui/inputs/input";
import { InputNumber } from "~/components/ui/inputs/input-number";
import { Select } from "~/components/ui/inputs/select";
import { TextArea } from "~/components/ui/inputs/textarea";

import { MLH_CODE_OF_CONDUCT, MLH_EMAILS, MLH_PRIVACY_POLICY } from "../constants/mlh-copy";
import { COUNTRY_OPTIONS, DEGREE_OPTIONS, ETHNICITY_OPTIONS, GENDER_OPTIONS } from "../constants/select-options";

import { SchoolCombobox } from "./school-selector";


export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  ethnicity: string;
  school: string;
  major: string;
  degree: string;
  country: string;
  graduationYear: number;
  // resume: string;
  hackathonsAttended: number;
  notes: string;
  mlhCodeOfConductAgreement: boolean;
  mlhPrivacyPolicyAgreement: boolean;
  mlhEmailAgreement: boolean;
}

export function RegistrationForm() {
  const { control } = useForm<RegistrationFormValues>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto,_1fr] gap-8">
      <FormSection name="Registrant Information" description="This information allows us to update you with the latest information about MakeUC.">
        <FormGroup>
          <Input control={control} label="First Name" name="firstName" placeholder="Enter First Name" required />
          <Input control={control} label="Last Name" name="lastName" placeholder="Enter Last Name" required />
        </FormGroup>
        <Input control={control} label="Email" name="email" placeholder="Enter Email" required />
        <FormGroup>
          <InputNumber control={control} label="Age" name="age" placeholder="Enter Age" required />
          <Select control={control} label="Gender" name="gender" placeholder="Enter Gender" options={GENDER_OPTIONS} required />
        </FormGroup>
        <Select control={control} label="Ethnicity" name="ethnicity" placeholder="Enter Ethnicity" options={ETHNICITY_OPTIONS} required />
      </FormSection>
      <FormSection name="Education" description="Based on your current academic institution and what degree you are working towards.">
        <SchoolCombobox control={control} name="school" />
        <FormGroup>
          <Input control={control} label="Major(s)" name="major" placeholder="Enter Major" required />
          <Select control={control} label="Degree" name="degree" placeholder="Select Degree" options={DEGREE_OPTIONS} required />
        </FormGroup>
        <Combobox control={control} label="Country" name="country" placeholder="Select Country" options={COUNTRY_OPTIONS} />
        <InputNumber control={control} label="Expected Graduation Year" name="graduationYear" placeholder="Enter Expected Graduation Year" required />
      </FormSection>
      <FormSection name="Additional Details" description="All of these fields are optional and you can fill in as much or as little detail as you would like.">
        <FileUpload label="Resume" name="resume" placeholder="Select Resume" />
        <InputNumber control={control} label="Number of Hackathons Attended" name="hackathonsAttended" placeholder="Enter Number of Hackathons Attended" />
        <TextArea control={control} label="Additional Notes" name="notes" placeholder="Enter Additional Notes" />
      </FormSection>
      <FormSection name="MLH Authorization" description="We are an MLH Member Event and as such are required to enforce the following.">
        <Checkbox control={control} label={MLH_CODE_OF_CONDUCT} name="mlhCodeOfConductAgreement" required />
        <Checkbox control={control} label={MLH_PRIVACY_POLICY} name="mlhPrivacyPolicyAgreement" required />
        <Checkbox control={control} label={MLH_EMAILS} name="mlhEmailAgreement" />
      </FormSection>
      <div className="flex justify-center md:justify-end md:col-span-2">
        <Button>Submit Registration</Button>
      </div>
    </div>
  );
}