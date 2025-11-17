import apiClient from "@/api/axiosConfig";

export interface INotification {
  _id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchNotifications = async (): Promise<INotification[]> => {
  const response = await apiClient.get("/notifications");
  console.log("Fetched notifications:", response.data.notifications);
  return response.data.notifications;
};

export const createNotification = async (
  message: string
): Promise<INotification> => {
  const response = await apiClient.post("/notifications", { message });
  return response.data.notification;
};

export const updateNotification = async (
  id: string,
  message: string
): Promise<INotification> => {
  const response = await apiClient.put(`/notifications/${id}`, { message });
  return response.data.notification;
};

export const deleteNotification = async (id: string): Promise<void> => {
  await apiClient.delete(`/notifications/${id}`);
};
