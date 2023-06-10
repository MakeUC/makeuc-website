import { Config } from "~/constants/config";


export const revalidate = Config.RevalidationFrequency;

export default async function HomePage() {
  return (
    <main>
      Hello World!
    </main>
  );
}
