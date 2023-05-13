import { Config } from "~/constants/config";
import { OrganizerCarousel } from "~/features/organizer-display/components/OrganizerCarousel";


export const revalidate = Config.RevalidationFrequency;

export default async function Home() {
  return (
    <main>
      Hello World!
      <OrganizerCarousel />
    </main>
  );
}
