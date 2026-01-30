import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import assets from "@/assets";

const WHATSAPP_PHONE = "41795326519";

const WhatsAppContact = () => {
  return (
    <div className="fixed bottom-3 left-3 z-50">
      <motion.a
        href={`https://wa.me/${WHATSAPP_PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="
          group relative
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-neutral-800
          text-white
          shadow-xl
          cursor-pointer

        "
      >
        {/* WhatsApp Icon */}
        <FaWhatsapp className="text-2xl opacity-90 text-green-500" />

        {/* Speech Bubble */}
        <motion.div
          className="
            pointer-events-none
            absolute bottom-full left-[8rem] -translate-x-1/2 mb-8
            w-64
            opacity-0 translate-y-2 scale-95
            transition-all duration-300 ease-out

            group-hover:opacity-100
            group-hover:translate-y-0
            group-hover:scale-100
            group-hover:animate-jelly
          "
          animate={{
            y: [-3, 3],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          {/* Bubble body */}
          <div
            className="
              relative
              rounded-2xl
              bg-neutral-900
              text-neutral-100
              shadow-2xl
              px-4 py-4
              border border-neutral-700
            "
          >
            <div className="flex gap-3 items-start">
              {/* Avatar placeholder */}
              <div
                className="
                  w-10 h-10
                  rounded-full
                  bg-neutral-700
                  flex-shrink-0
                "
              >
                <img
                  src={assets.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Message */}
              <p className="text-sm leading-relaxed font-light text-zinc-300">
                Hi! 👋 If you’d like to contact me directly, you can reach me
                right here.
              </p>
            </div>

            {/* Triangle (bottom-left) */}
            <div
              className="
                absolute bottom-[-6px] left-6
                w-3 h-3
                bg-neutral-900
                rotate-45
                border-l border-b border-neutral-700
                z-[-1]
              "
            />
          </div>
        </motion.div>
      </motion.a>
    </div>
  );
};

export default WhatsAppContact;
