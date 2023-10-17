import { Stats } from "~/components/general/stats";
import { PageTitle } from "~/components/general/typography";
import { Config } from "~/constants/config";


export const revalidate = Config.RevalidationFrequency;

export default function StatsPage() {
  const year = new Date().getFullYear() - 1;

  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle className="text-center">Statistics for {year}</PageTitle>
        <hr className="border border-muted-foreground" />
        <div className="mt-4">
          <Stats year={year} />
        </div>
      </div>
    </div>
  );
}