import { createFileRoute } from "@tanstack/react-router";
import { AdminRoute } from "../../components/admin/AdminRoute";
import EditNotification from "@/pages/admin/EditNotification";

export const Route = createFileRoute("/admin/notifications/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminRoute>
      <EditNotification />
    </AdminRoute>
  );
}
