import { PageTitle } from "~/components/general/typography";
import { SignInForm } from "~/features/auth";


export const metadata = {
  title: "Sign In",
};

export default function RegistrationPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Sign In</PageTitle>
        <SignInForm strategies={["google"]} />
      </div>
    </div>
  );
}