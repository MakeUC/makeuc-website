import { PageTitle } from "~/components/general/typography";
import { RegistrationForm } from "~/features/registration";


export const metadata = {
  title: "Registration",
};

export default function RegistrationPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Registration</PageTitle>
        {/*<RegistrationForm />*/}
        {<div>Registration is currently closed</div>}
      </div>
    </div>
  );
}