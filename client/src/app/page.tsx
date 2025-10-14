import Image from "next/image";
import Link from "next/link";

import { SponsorGridPlaceholder } from "~/features/sponsors";

import { About } from "../components/general/about";
import { Faq } from "../components/general/faq";
import { HeroSection } from "../components/general/hero-section";
import { ViewportSection } from "../components/ui/viewport-section";
import { TrackGrid } from "../features/tracks/components/track-grid";


export default async function HomePage() {
  return (
    <main>
      <HeroSection />

      <ViewportSection className="flex items-center justify-center py-8 bg-muted">
        <div className="flex flex-col gap-8 px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center titillium-web-bold">
            About
          </h2>
          <About />
        </div>
      </ViewportSection>

      <ViewportSection className="flex flex-col items-center justify-center py-8">
        <div className="px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center mb-8 titillium-web-bold">
            Tracks
          </h2>
        </div>
        <div className="p-8">
          <TrackGrid />
        </div>
      </ViewportSection>

      <ViewportSection className="flex items-center justify-center py-8 bg-muted">
        <div className="px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center mb-8 titillium-web-bold">
            Frequently Asked Questions
          </h2>
          <Faq />
        </div>
      </ViewportSection>

      <ViewportSection className="flex items-center justify-center py-8">
        <div className="px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center mb-8 titillium-web-bold">
            Sponsors
          </h2>
          <h3 className="text-center titillium-web-regular">
            Are you interested in sponsoring MakeUC? Please email us at{" "}
            <Link href="mailto:contact@makeuc.io" className="text-primary">
              contact@makeuc.io
            </Link>
            !
          </h3>
          <br />
          {<SponsorGridPlaceholder />}
          {/* <div className="flex flex-col justify-center items-center gap-8 border-4 border-dashed border-muted text-muted-gray-foreground rounded mt-8 min-h-[200px] p-4"> */}
          {/* <span className="text-xl font-semibold text-center">There are no sponsors currently. Please check back in the future!</span> */}
          {/* <PlugZap size={48} strokeWidth={1} /> */}
          {/* </div> */}
        </div>
      </ViewportSection>
    </main>
  );
}
