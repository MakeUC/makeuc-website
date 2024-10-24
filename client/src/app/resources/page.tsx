import { PageTitle } from "~/components/general/typography";
import { FreeResources, SponsorResources } from "~/features/live-site";


export const metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        {/* <PageTitle>Sponsor Resources</PageTitle>
        <hr className="border border-muted-foreground" />
        <section className="items-center">
          <div className="mt-4">
            <SponsorResources />
          </div>
        </section> */}
        <PageTitle>Free Resources</PageTitle>
        <hr className="border border-muted-foreground" />
        <section className="items-center">
          <div className="mt-4">
            <FreeResources />
          </div>
        </section>
      </div>
    </div>
  );
}