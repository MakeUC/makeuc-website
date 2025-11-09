import { PageTitle } from "~/components/general/typography";
import { SignInForm } from "~/features/auth";


export const metadata = {
  title: "Sign In",
};

export default function RegistrationPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl flex flex-col items-center">
        <PageTitle>Sign In</PageTitle>
        {/* TODO: Temporarily disabling microsoft login */}
        <SignInForm strategies={["google"/*, "microsoft"*/]} />
      </div>
    </div>
  );
}