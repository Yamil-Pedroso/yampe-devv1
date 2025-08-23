import { motion } from "framer-motion";
import { GiHand } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

interface ModalNoteProps {
  onClose: () => void;
}

const ModalNote = ({ onClose }: ModalNoteProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3, duration: 0.5 }}
    className="fixed inset-0 z-[1000]"
  >
    <motion.div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] "
      onClick={onClose}
    >
      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 1 }}
        transition={{
          delay: 3,
          type: "spring",
          stiffness: 300,
          damping: 15,
          mass: 0.8,
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-bg1-color text-center rounded-md w-full
          max-w-[25rem] p-8
          md:max-w-[21.875rem] md:p-7
          sm:max-w-[18.75rem] sm:p-3.5
          xs:max-w-[16.25rem] xs:p-3
        "
      >
        <h2
          className="
            mt-0 flex justify-center items-center text-[1.5rem]
            md:text-[1.375rem] sm:text-[1.25rem] xs:text-[1.125rem]
          "
        >
          Hola!
          <GiHand className="ml-2 text-[1.5rem] align-middle" />
        </h2>

        <p
          className="
            my-2.5 text-base
            md:text-[0.9375rem] sm:text-sm xs:text-[0.8125rem]
          "
        >
          This web portfolio is being updated. Fresh content and case studies
          are coming shortly.
        </p>

        {/*<button
          onClick={onClose}
          className="
            mt-5 px-5 py-2.5 text-base rounded bg-color0 text-zinc-800 font-semibold
            hover:bg-color1 transition-colors duration-300 cursor-pointer
            md:px-4 md:py-2 md:text-[0.9375rem]
            sm:px-3.5 sm:py-2 sm:text-sm
            xs:px-3 xs:py-1.5 xs:text-[0.8125rem]
          "
        >
          Close
        </button>*/}

        <IoClose
          className="absolute top-[-1.2rem] right-[-1.2rem] cursor-pointer text-color0 rotate-90 transition-transform duration-300 hover:rotate-0"
          onClick={onClose}
          size={24}
        />
      </motion.div>
    </motion.div>
  </motion.div>
);

export default ModalNote;
