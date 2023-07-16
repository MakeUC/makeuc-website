import Image from "next/image";
import Link from "next/link";

import Logo from "~/assets/logo.png";
import MakeUCText from "~/assets/makeuc-text.png";
import { About } from "~/components/general/about";
import { Faq } from "~/components/general/faq";
import { Button } from "~/components/ui/button";
import { ViewportSection } from "~/components/ui/viewport-section";
import { SponsorGridPlaceholder } from "~/features/sponsors";
import { TrackGrid } from "~/features/tracks";


export default async function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[calc(100vh-70px)]">
        <div className="absolute h-full w-full hero-image -z-10" />
        <div className="flex flex-1 justify-center items-center md:-translate-y-[35px]">
          <div className="flex flex-col p-8 pt-48 md:flex-row justify-between items-center w-full max-w-7xl md:pt-8 gap-16">
            <div>
              <Image src={MakeUCText} alt="MakeUC" />
              <div className="text-muted-foreground text-xl mt-4">November 4 - 5, 2023</div>

              <Link href="/registration" className="" tabIndex={-1}>
                <Button className="flex gap-2 mt-4" size="lg">Register Now</Button>
              </Link>
            </div>
            <div>
              <Image src={Logo} alt="MakeUC Butterfly Logo" width={400} />
            </div>
          </div>
        </div>
      </section>

      <ViewportSection className="flex items-center justify-center py-8 bg-muted">
        <div className="flex flex-col gap-8 px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center">About</h2>
          <About />
        </div>
      </ViewportSection>


      <ViewportSection className="flex flex-col items-center justify-center py-8">
        <div className="px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center mb-8">Tracks</h2>
        </div>
        <div className="p-8">
          <TrackGrid />
        </div>
      </ViewportSection>


      <ViewportSection className="flex items-center justify-center py-8 bg-muted">
        <div className="px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center mb-8">Frequently Asked Questions</h2>
          <Faq />
        </div>
      </ViewportSection>


      <ViewportSection className="flex items-center justify-center py-8">
        <div className="px-8 w-full max-w-5xl">
          <h2 className="text-3xl font-bold tracking-wider text-center mb-8">Sponsors</h2>
          <h3 className="text-center">Are you interested in sponsoring MakeUC? Please email us at <Link href="mailto:info@makeuc.io" className="text-primary">info@makeuc.io</Link>!</h3>
          <br />
          <SponsorGridPlaceholder />
          {/* <div className="flex flex-col justify-center items-center gap-8 border-4 border-dashed border-muted text-muted-gray-foreground rounded mt-8 min-h-[200px] p-4">
            <span className="text-xl font-semibold text-center">There are no sponsors currently. Please check back in the future!</span>
            <PlugZap size={48} strokeWidth={1} />
          </div> */}
        </div>
      </ViewportSection>
    </main>
  );
}
