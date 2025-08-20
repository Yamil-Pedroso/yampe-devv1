import { FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";

interface AppointmentFormProps {
  className?: string;
}

const AppointmentForm = ({ className }: AppointmentFormProps) => {
  return (
    <div
      className={`${className} text-white w-[15rem] min-w-[15rem] max-w-[15rem] md:w-[22rem] md:min-w-[22rem] md:max-w-[22rem]`}
    >
      <h2 className="text-[1.3rem] md:text-2xl font-bold mb-6">
        Book an Appointment
      </h2>

      <form className="flex flex-col space-y-6">
        <div className="flex items-center border-b border-gray-500 pb-2">
          <FaUser className="text-orange-400 mr-3" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center border-b border-gray-500 pb-2">
          <FaEnvelope className="text-orange-400 mr-3" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-400"
          />
        </div>

        <div className="flex items-start border-b border-gray-500 pb-2">
          <FaCommentAlt className="text-orange-400 mr-3 mt-1" />
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Message"
            required
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-black font-bold px-6 py-3 rounded-full transition-colors duration-300"
        >
          Submit Now
          <IoMdArrowForward className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
