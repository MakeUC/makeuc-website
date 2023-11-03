import { PageTitle } from "~/components/general/typography";
import { Judging } from "~/features/live-site";


export default function AboutPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Judging</PageTitle>
        <hr className="border border-muted-foreground" />
        <div className="flex flex-col gap-8 mt-4">
          <Judging />
        </div>
      </div>
    </div>);
}