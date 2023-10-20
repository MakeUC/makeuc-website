import { LiveSite } from "~/components/general/live-site";
import { PageTitle } from "~/components/general/typography";


export const metadata = {
  title: "Live Site",
};

export default function LivePage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Live Site</PageTitle>
        <LiveSite />
      </div>
    </div>
  );
}