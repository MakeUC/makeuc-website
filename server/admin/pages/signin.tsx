import Image from "next/image";
import Link from "next/link";

import GoogleLogo from "../assets/google-logo.png";
import Logo from "../assets/logo.png";
import MicrosoftLogo from "../assets/microsoft-logo.png";


const SUPPORTED_STRATEGIES = {
  google: { name: "Google", icon: <Image alt="Google" src={GoogleLogo} width={20} height={20} />, className: "" },
  microsoft: { name: "Microsoft", icon: <Image alt="Microsoft" src={MicrosoftLogo} width={20} height={20} />, className: "" },
} as const;

export interface LoginFormProps {
  strategies: (keyof typeof SUPPORTED_STRATEGIES)[];
}

export default function SignInForm({ strategies }: LoginFormProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem", height: "100vh", paddingBottom: "30vh", background: "#121317" }}>
      <Image alt="MakeUC Logo" src={Logo} width={150} height={150} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "230px" }}>
        {    
          strategies.map(strategyKey => {
            const strategy = SUPPORTED_STRATEGIES[strategyKey];
            return (
              <Link
                key={strategyKey}
                href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/auth/strategy/${strategyKey}/login`}
                className="flex gap-2 px-3 py-2 bg-white text-[#212121] font-medium rounded-full"
              >
                {strategy.icon} Sign in with {strategy.name}
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}