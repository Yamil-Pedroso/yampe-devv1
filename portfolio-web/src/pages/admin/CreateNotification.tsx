/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "@tanstack/react-router";
import NotificationForm from "../../components/admin/NotificationForm";
import { createNotification } from "../../components/services/notificationsService";

export default function CreateNotification() {
  const navigate = useNavigate();

  async function handleCreate(message: string) {
    await createNotification(message);
    navigate({ to: "/admin/notifications" });
  }

  return (
    <NotificationForm
      title="Create Notification"
      buttonText="Create"
      onSubmit={handleCreate}
    />
  );
}
