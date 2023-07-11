import { Stats } from "~/components/general/stats";


export default function StatsPage() {
  return (
    <div className="px-8 w-full max-w-5xl">
      <h2 className="text-3xl font-bold tracking-wider text-center mb-5">Statistics</h2>
      <Stats />
    </div>
  );
}