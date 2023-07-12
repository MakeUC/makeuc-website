import { Stats } from "~/components/general/stats";
import { PageTitle } from "~/components/general/typography";


export default function StatsPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Statistics</PageTitle>
        <hr className="border border-muted-foreground" />
        <div className="mt-4">
          <Stats />
        </div>
      </div>
    </div>
  );
}