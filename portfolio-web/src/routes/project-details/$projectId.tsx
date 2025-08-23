import { createFileRoute } from "@tanstack/react-router";
import ProjectDetails from "@/components/projects/project-details/ProjectDetails";

export const Route = createFileRoute("/project-details/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProjectDetails />;
}
