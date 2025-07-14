import { Faq } from "~/components/general/faq";
import { PageTitle } from "~/components/general/typography";


export default function FAQPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Frequently Asked Questions</PageTitle>
        <hr className="border border-muted-foreground" />
        <div className="mt-4">
          <Faq />
        </div>
      </div>
    </div>
  );
}