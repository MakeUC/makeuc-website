import { PageTitle } from "~/components/general/typography";
import { ProjectsTable } from "~/features/judging";


export const metadata = {
  title: "Dashboard > Projects",
};

export default function DashboardProjectsPage() {
  return (
    <div className="flex justify-center">
      <div className="px-8 w-full max-w-5xl">
        <PageTitle>Projects</PageTitle>
        <ProjectsTable />
      </div>
    </div>
  );
}