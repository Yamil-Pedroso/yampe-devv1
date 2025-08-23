import { createFileRoute } from "@tanstack/react-router";
import ProjectsGallery from "@/components/projects/projects-galllery/ProjectsGallery";

export const Route = createFileRoute("/projects-gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProjectsGallery />;
}
