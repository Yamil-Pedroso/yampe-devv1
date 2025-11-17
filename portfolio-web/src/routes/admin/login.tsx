import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "@/pages/admin/AdminLogin";

export const Route = createFileRoute("/admin/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminLogin />;
}
