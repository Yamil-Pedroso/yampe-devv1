/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ModalNotification from "./ModalNotification";
import { fetchNotifications } from "../../services/notificationsService";

const POLLING_INTERVAL = 12000; // 12 seconds

const NotificationWrapper = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchNotifications();

      setNotifications(data);

      const savedCount = Number(localStorage.getItem("notifCount") || 0);

      // NEW NOTIFICATION DETECTED
      if (data.length > savedCount) {
        setTimeout(() => {
          setShowModal(true);
        }, 10000); // wait 10 seconds
      }

      // update local storage
      localStorage.setItem("notifCount", data.length.toString());
    }

    // Initial load
    load();

    // Polling: fetch every X seconds
    const interval = setInterval(load, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const lastNotif = notifications[0];

  return (
    <>
      {lastNotif && (
        <ModalNotification
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message={lastNotif.message}
          createdAt={lastNotif.createdAt}
        />
      )}
    </>
  );
};

export default NotificationWrapper;
