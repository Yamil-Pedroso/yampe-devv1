import apiClient from "@/api/axiosConfig";

interface INotification {
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
