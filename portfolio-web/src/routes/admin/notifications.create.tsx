import { createFileRoute } from "@tanstack/react-router";
import { AdminRoute } from "../../components/admin/AdminRoute";
import CreateNotification from "@/pages/admin/CreateNotification";

export const Route = createFileRoute("/admin/notifications/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminRoute>
      <CreateNotification />
    </AdminRoute>
  );
}
