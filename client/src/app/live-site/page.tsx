import { PageTitle } from "~/components/general/typography";
import { Timer } from "~/features/live-site/components/countdown";
/* import { hackerScheduleGridPlaceholder } from "~/features/live-site/components/schedule-grid";
*/

export const metadata = {
  title: "Live Site",
};

export default function LiveSite() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Live Site</PageTitle>
        <hr className="border border-muted-foreground" />
        <div className="mt-4">
          <Timer />
        </div>
        <hr className="border border-muted-foreground" />
        <div className="mt-4">
          {/* <hackerScheduleGridPlaceholder />{} */}
        </div>
      </div>
    </div>
  );
}