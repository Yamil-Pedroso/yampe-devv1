/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  fetchNotifications,
  deleteNotification,
  INotification,
} from "../../components/services/notificationsService";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const navigate = useNavigate();

  async function loadNotifications() {
    const data = await fetchNotifications();
    setNotifications(data);
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function handleDelete(id: string) {
    await deleteNotification(id);
    loadNotifications();
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <button
        onClick={() => navigate({ to: "/admin/notifications/create" })}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        + Create New Notification
      </button>

      <table className="w-full bg-white/10 rounded-xl overflow-hidden shadow-md">
        <thead>
          <tr className="bg-white/20">
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((n: any) => (
            <tr key={n._id} className="border-b border-white/10">
              <td className="p-3">{n.message}</td>
              <td className="p-3">{new Date(n.createdAt).toLocaleString()}</td>

              <td className="p-3 flex gap-3">
                <button
                  onClick={() =>
                    navigate({
                      to: `/admin/notifications/${n._id}/edit`,
                    })
                  }
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(n._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
