import { PageTitle } from "~/components/general/typography";
import { TrackGrid } from "~/features/tracks";


export default function FAQPage() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center px-8">
        <PageTitle className="w-full">Tracks</PageTitle>
        <hr className="border border-muted-foreground w-full" />
        <div className="mt-4 pt-8">
          <TrackGrid />
        </div>
      </div>
    </div>);
}