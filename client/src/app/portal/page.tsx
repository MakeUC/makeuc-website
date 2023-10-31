import { PageTitle } from "~/components/general/typography";
import { RegistrationFormEdit } from "~/features/registration";


export const metadata = {
  title: "Registration",
};

export default function RegistrationPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Registration</PageTitle>
        <RegistrationFormEdit />
      </div>
    </div>
  );
}