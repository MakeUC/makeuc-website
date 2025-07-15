import Image from "next/image";
import Link from "next/link";

import GoogleLogo from "../assets/google-logo.png";
import Logo from "../assets/logo.png";
import MicrosoftLogo from "../assets/microsoft.svg";


const SUPPORTED_STRATEGIES = {
  google: { name: "Google", icon: <Image alt="Google" src={GoogleLogo} width={20} height={20} />, className: "" },
  microsoft: { name: "Microsoft", icon: <Image alt="Microsoft" src={MicrosoftLogo} width={20} height={20} />, className: "" },
} as const;

export interface LoginFormProps {
  strategies: (keyof typeof SUPPORTED_STRATEGIES)[];
}

export default function SignInForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem", height: "100vh", paddingBottom: "30vh", background: "#121317" }}>
      <Image alt="MakeUC Logo" src={Logo} width={150} height={150} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "230px" }}>
        {
          Object.keys(SUPPORTED_STRATEGIES).map(strategyKey => {
            const strategy = SUPPORTED_STRATEGIES[strategyKey as keyof typeof SUPPORTED_STRATEGIES];
            return (
              <Link
                key={strategyKey}
                href={`/auth/strategy/${strategyKey}/login?state=isAdminLogin`}
                style={{ display: "flex", gap: "0.5rem", padding: "0.5rem 0.75rem", background: "#fff", color: "#212121", fontWeight: "500", borderRadius: "9999px" }}
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