import { About } from "~/components/general/about";
import { PageTitle } from "~/components/general/typography";


export default function AboutPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>About</PageTitle>
        <hr className="border border-muted-foreground" />
        <div className="flex flex-col gap-8 mt-4">
          <About />
        </div>
      </div>
    </div>);
}