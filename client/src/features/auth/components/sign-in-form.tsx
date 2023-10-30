import Image from "next/image";
import Link from "next/link";

import GoogleLogo from "../assets/google-logo.png";


const SUPPORTED_STRATEGIES = {
  google: { name: "Google", icon: <Image alt="Google" src={GoogleLogo} width={20} height={20} />, className: "" },
} as const;

export interface LoginFormProps {
  strategies: (keyof typeof SUPPORTED_STRATEGIES)[];
}

export function SignInForm({ strategies }: LoginFormProps) {
  return (
    <div className="flex flex-col gap-2 w-[210px]">
      {
        strategies.map(strategyKey => {
          const strategy = SUPPORTED_STRATEGIES[strategyKey];
          return (
            <Link
              key={strategyKey}
              href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/auth/strategy/${strategyKey}/login`}
              className="flex justify-between px-3 py-2 bg-white text-[#212121] font-medium rounded-full"
            >
              {strategy.icon} Log in with {strategy.name}
            </Link>
          );
        })
      }
    </div>
  );
}