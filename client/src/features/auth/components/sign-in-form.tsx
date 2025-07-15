import Image from "next/image";
import Link from "next/link";

import GoogleLogo from "../assets/google-logo.png";
import MicrosoftLogo from "../assets/microsoft.svg";


const SUPPORTED_STRATEGIES = {
  google: { name: "Google", iconType: "img", iconSrc: GoogleLogo, className: "" },
  microsoft: { name: "Microsoft", iconType: "svg", iconSrc: MicrosoftLogo, className: "" },
} as const;

export interface LoginFormProps {
  strategies: (keyof typeof SUPPORTED_STRATEGIES)[];
}

export function SignInForm({ strategies }: LoginFormProps) {
  return (
    <div className="flex flex-col gap-2 w-[230px]">
      {
        strategies.map(strategyKey => {
          const strategy = SUPPORTED_STRATEGIES[strategyKey];
          return (
            <Link
              key={strategyKey}
              href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/auth/strategy/${strategyKey}/login`}
              className="flex gap-2 px-3 py-2 bg-white text-[#212121] font-medium rounded-full"
            >
              {strategy.iconType === "img" ? (
                <Image alt={strategy.name} src={strategy.iconSrc} width={20} height={20} />
              ) : (
                <strategy.iconSrc width={20} height={20} title={strategy.name} />
              )} Sign in with {strategy.name}
            </Link>
          );
        })
      }
    </div>
  );
}