import { useState } from "react";
import { FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../common/buttons/Button";
import {
  ctaEnter,
  ctaHover,
  ctaTap,
} from "@/components/common/animation/motionTokens";

interface AppointmentFormProps {
  className?: string;
}

const AppointmentForm = ({ className }: AppointmentFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "name") setName(value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    console.log("Email submitted:", email);
    alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <div
      className={`${className} text-white shrink-0
      w-[15rem] min-w-[15rem] max-w-[15rem]
      md:w-[22rem] md:min-w-[22rem] md:max-w-[22rem]`}
    >
      <h2 className="text-[1.3rem] md:text-2xl font-bold mb-6">
        Book an Appointment
      </h2>

      <form className="flex flex-col space-y-6" onSubmit={handleOnSubmit}>
        <div className="flex items-center border-b border-gray-500 pb-2 focus-within:border-color0 transition-colors">
          <FaUser className="text-color0 mr-3" />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Name"
            autoComplete="name"
            required
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-400
                       focus:outline-none"
          />
        </div>

        <div className="flex items-center border-b border-gray-500 pb-2 focus-within:border-color0 transition-colors">
          <FaEnvelope className="text-color0 mr-3" />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Email Address"
            autoComplete="email"
            required
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-400
                       focus:outline-none"
          />
        </div>

        <div className="flex items-start border-b border-gray-500 pb-2 focus-within:border-color0 transition-colors">
          <FaCommentAlt className="text-color0 mr-3 mt-1" />
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleMessageChange}
            rows={4}
            placeholder="Message"
            required
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-400
                       resize-none focus:outline-none"
          />
        </div>

        <Button
          type="submit"
          initial="hidden"
          animate="show"
          variants={ctaEnter}
          transition={{ delay: 0.35 }}
          whileHover={ctaHover}
          whileTap={ctaTap}
          className="cursor-pointer group"
        >
          <span className="font-bold">Submit Now</span>
          <IoIosArrowForward
            className="ml-2 group-hover:ml-3 transition-all duration-300"
            size={20}
          />
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
