import { PageTitle } from "~/components/general/typography";
import { Config } from "~/constants/config";
import { RegistrationForm } from "~/features/registration";


export const metadata = {
  title: "Registration",
};

export default function RegistrationPage() {


  function FallbackMessage() {
    return <div className="flex justify-center text-center">
      <div className="p-8 w-full max-w-5xl">
        <div className="text-2xl font-bold">Registration is currently closed</div>
      </div>
    </div>;
  }

  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Registration</PageTitle>
        {Config.ShowRegistration ? <RegistrationForm /> : <FallbackMessage />}
      </div>
    </div>
  );
}



