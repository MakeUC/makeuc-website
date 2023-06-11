"use client";

import { Button } from "~/components/ui/button";
import { FormGroup, FormSection } from "~/components/ui/form";
import { Checkbox } from "~/components/ui/inputs/checkbox";
import { Combobox } from "~/components/ui/inputs/combobox";
import { FileUpload } from "~/components/ui/inputs/file-upload";
import { Input } from "~/components/ui/inputs/input";
import { Select } from "~/components/ui/inputs/select";
import { TextArea } from "~/components/ui/inputs/textarea";

import { MLH_CODE_OF_CONDUCT, MLH_EMAILS, MLH_PRIVACY_POLICY } from "../constants/mlh-copy";
import { COUNTRY_OPTIONS, DEGREE_OPTIONS, GENDER_OPTIONS } from "../constants/select-options";

import { SchoolCombobox } from "./school-selector";



export function RegistrationForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto,_1fr] gap-8">
      <FormSection name="Registrant Information" description="This information allows us to update you with the latest information about MakeUC.">
        <FormGroup>
          <Input label="First Name" name="firstName" placeholder="Enter First Name" required />
          <Input label="Last Name" name="lastName" placeholder="Enter Last Name" required />
        </FormGroup>
        <Input label="Email" name="email" placeholder="Enter Email" required />
        <FormGroup>
          <Input label="Age" name="age" placeholder="Enter Age" required />
          <Select label="Gender" name="gender" placeholder="Enter Gender" options={GENDER_OPTIONS} required />
        </FormGroup>
        <Input label="Ethnicity" name="ethnicity" placeholder="Enter Ethnicity" required />
      </FormSection>
      <FormSection name="Education" description="Based on your current academic institution and what degree you are working towards.">
        <SchoolCombobox />
        <FormGroup>
          <Input label="Major(s)" name="major" placeholder="Enter Degree" required />
          <Select label="Degree" name="degree" placeholder="Select Degree" options={DEGREE_OPTIONS} required />
        </FormGroup>
        <Combobox label="Country" name="country" placeholder="Select Country" options={COUNTRY_OPTIONS} />
        <Input label="Expected Graduation Year" name="graduationYear" placeholder="Enter Expected Graduation Year" required />
      </FormSection>
      <FormSection name="Additional Details" description="All of these fields are optional and you can fill in as much or as little detail as you would like.">
        <FileUpload label="Resume" name="resume" placeholder="Select Resume" />
        <Input label="Number of Hackathons Attended" name="hackathonsAttended" placeholder="Enter Number of Hackathons Attended" />
        <TextArea label="Additional Notes" name="notes" placeholder="Enter Additional Notes" />
      </FormSection>
      <FormSection name="MLH Authorization" description="We are an MLH Member Event and as such are required to enforce the following.">
        <Checkbox label={MLH_CODE_OF_CONDUCT} name="mlhCodeOfConductAgreement" required />
        <Checkbox label={MLH_PRIVACY_POLICY} name="mlhPrivacyPolicyAgreement" required />
        <Checkbox label={MLH_EMAILS} name="mlhEmailAgreement" />
      </FormSection>
      <div className="flex justify-center md:justify-end md:col-span-2">
        <Button>Submit Registration</Button>
      </div>
    </div>
  );
}