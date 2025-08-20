import { createFileRoute } from "@tanstack/react-router";
import WorkDetails from "@/components/works/work-details/WorkDetails";

export const Route = createFileRoute("/work-details/$worksId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkDetails />;
}
