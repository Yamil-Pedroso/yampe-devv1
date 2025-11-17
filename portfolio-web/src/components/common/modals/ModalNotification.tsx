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
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-[#141414] text-white rounded-3xl p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)] w-[90%] max-w-xl border border-white/10"
          >
            {/* Imagen decorativa superior */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-0 left-0 right-0 h-32 rounded-t-3xl overflow-hidden"
            >
              <img
                src="/images/avatar/junger_pro.png"
                alt="notification-bg"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#141414]"></div>
            </motion.div>

            {/* Glow animado detrás del icono */}
            <motion.div
              className="absolute top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4 }}
            />

            {/* Icono */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              className="relative z-10 mx-auto bg-green-500/10 p-5 rounded-full border border-green-400/20 shadow-xl w-fit"
            >
              <IoIosNotifications className="text-green-400 text-5xl" />
            </motion.div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-center mt-8">
              Notification Created
            </h2>

            {/* Mensaje */}
            <p className="text-gray-300 text-center mt-3 leading-relaxed text-lg">
              {message}
            </p>

            {/* Fecha */}
            <p className="text-gray-400 text-sm text-center mt-3">
              🕒 {new Date(createdAt).toLocaleString()}
            </p>

            {/* Botón */}
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 transition font-semibold shadow-lg text-black"
              >
                Got it
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalNotification;
