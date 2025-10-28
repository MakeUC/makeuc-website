import Link from "next/link";

import HeaderSVG from "~/assets/header.svg";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/ui/Logo";
import { Config } from "~/constants/config";


export function HeroSection() {
  return (
    <section
      className="relative flex flex-col min-h-[calc(100vh-70px)]"
      style={{
        backgroundImage: "url('/assets/header.svg')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "125vh auto",
        backgroundPosition: "top left",
      }}
    >
      <div className="flex-1 flex flex-col justify-end">
        <div className="z-9 flex flex-col md:flex-row justify-between items-center w-full max-w-7xl gap-16 mx-auto p-8 pb-12">
          <div className="flex flex-col items-start text-left w-full md:w-auto">
            <div className="text-muted-foreground text-large mt-4 header-text text-left">
              <h1
                style={{
                  textShadow: "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 #fff",
                  color: "var(--logo)",
                }}
                className="drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              >
                MakeUC 2025
              </h1>
              <span className="block text-white text-xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                November 8-9th, 2025
              </span>
            </div>
            {Config.ShowRegistration && (
              <Link href="/registration" className="" tabIndex={-1}>
                <Button
                  className="flex gap-2 mt-4 titillium-web-bold"
                  size="lg"
                >
                  Register Now!
                </Button>
              </Link>
            )
            }
            <Link href="/live" className="" tabIndex={-1}>
              <Button className="flex gap-2 mt-4 titillium-web-bold" size="lg">
                View Live Site!
              </Button>
            </Link>
            {/* <Link href="/about" className="" tabIndex={-1}>
              <Button className="flex gap-2 mt-4 titillium-web-bold" size="lg">
                View Hackathon Information
              </Button>
            </Link> */}
          </div>
          <div className="flex-shrink-0">
            <Logo
              width={400}
              className="drop-shadow-[0_8px_48px_rgba(0,0,0,0.85)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
