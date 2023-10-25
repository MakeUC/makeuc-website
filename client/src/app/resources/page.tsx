import { PageTitle } from "~/components/general/typography";
import { FreeResources } from "~/features/live-site/constants/resources";
import { SponsorResources } from "~/features/live-site/constants/sponsor_resources";


export const metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Sponsor Resources</PageTitle>
        <section className="items-center bg-muted">
          <hr className="border border-muted-foreground" />
          <div className="mt-4">
            <SponsorResources />
          </div>
        </section>
        <PageTitle>Free Resources</PageTitle>
        <section className="items-center bg-muted">
          <hr className="border border-muted-foreground" />
          <div className="mt-4">
            <FreeResources />
          </div>
        </section>
      </div>
    </div>
  );
}