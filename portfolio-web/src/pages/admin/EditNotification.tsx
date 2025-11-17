/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import NotificationForm from "../../components/admin/NotificationForm";
import {
  fetchNotifications,
  updateNotification,
  type INotification,
} from "../../components/services/notificationsService";

export default function EditNotification() {
  const { id } = useParams({ from: "/admin/notifications/$id/edit" });
  const [notification, setNotification] = useState<INotification | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications().then((data) => {
      const found = data.find((n) => n._id === id);
      setNotification(found ?? null);
    });
  }, [id]);

  async function handleUpdate(message: string) {
    await updateNotification(id, message);
    navigate({ to: "/admin/notifications" });
  }

  if (!notification) return <p>Loading...</p>;

  return (
    <NotificationForm
      title="Edit Notification"
      buttonText="Save Changes"
      initialMessage={notification.message}
      onSubmit={handleUpdate}
    />
  );
}
