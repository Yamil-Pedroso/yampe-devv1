import { createFileRoute } from "@tanstack/react-router";
import { AdminRoute } from "../../components/admin/AdminRoute";
import AdminNotifications from "@/pages/admin/AdminNotification";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminRoute>
      <AdminNotifications />
    </AdminRoute>
  );
}
