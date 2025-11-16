import { motion, AnimatePresence } from "framer-motion";
import { IoIosNotifications } from "react-icons/io";

interface ModalNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  createdAt: string;
}

const ModalNotification = ({
  isOpen,
  onClose,
  message,
  createdAt,
}: ModalNotificationProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#1f1f1f] text-white rounded-2xl px-8 py-6 shadow-2xl w-[90%] max-w-md relative"
          >
            {/* Ícono */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="bg-green-500/20 rounded-full p-4"
              >
                <IoIosNotifications className="text-green-400 text-4xl" />
              </motion.div>
            </div>

            {/* Texto */}
            <h2 className="text-xl font-semibold text-center mt-4">
              New Notification
            </h2>

            <p className="text-gray-300 text-center mt-2 leading-relaxed">
              {message}
            </p>

            {/* Hora */}
            <p className="text-gray-400 text-sm text-center mt-3">
              🕒 {new Date(createdAt).toLocaleString()}
            </p>

            {/* Botón cerrar */}
            <div className="flex justify-center mt-6 cursor-pointer">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 transition font-semibold shadow-lg cursor-pointer"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalNotification;
