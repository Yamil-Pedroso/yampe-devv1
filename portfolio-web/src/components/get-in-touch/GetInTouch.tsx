import ElementContainer from "@/components/common/element-container/ElementContainer";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import { RxText } from "react-icons/rx";
import { getInTouchData } from "@/data/getInTouchData";
import Button from "@/components/common/buttons/Button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const GetInTouch = () => {
  const { header, description } = getInTouchData;

  return (
    <motion.section
      className="
        flex justify-center mt-30
        flex-col lg:flex-row items-stretch
        gap-10 lg:gap-12
        px-4 sm:px-6 lg:px-0
        max-w-[1200px] mx-auto
      "
      initial={{ opacity: 0.001 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Bloque izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -90, y: 20, filter: "blur(6px)" }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        }}
        viewport={{ once: true, amount: 0.35 }}
        className="
          flex flex-col gap-4 sm:gap-5
          w-full lg:max-w-[30%]
        "
      >
        <h2 className="text-color4 font-bold">{header}</h2>

        <p
          className="
            text-[2rem] sm:text-[2.5rem] lg:text-[2.8125rem]
            max-w-[45rem] text-base/13 mt-3.5
          "
        >
          Let's Talk For your{" "}
          <span className="text-color0 ">Next Projects</span>
        </p>

        <p className="text-color4 text-sm sm:text-base">{description}</p>

        <div>
          <ul className="flex flex-col gap-3 sm:gap-4 mt-4">
            {getInTouchData.servicesTags?.map((service, index) => (
              <li key={index} className="flex items-center">
                <div className="flex justify-center items-center w-[1.875rem] h-[1.875rem] rounded-full bg-color0 overflow-hidden">
                  <service.icon className="text-bg1-color text-[1.1rem]" />
                </div>
                <span className="ml-4 sm:ml-6 text-color4 text-[16px] sm:text-[18px] lg:text-[20px]">
                  {service.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Formulario */}
      <motion.form
        initial={{ opacity: 0, x: 90, y: 20, filter: "blur(6px)" }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          },
        }}
        viewport={{ once: true, amount: 0.35 }}
        action=""
        className="
          flex flex-col gap-6 sm:gap-8
          w-full lg:max-w-[70%]
          mx-0 lg:mx-4
        "
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex flex-col gap-3 sm:gap-6 w-full">
            <label htmlFor="name" className="text-sm sm:text-base">
              Full Name:
            </label>
            <ElementContainer
              border
              className="
                flex justify-between items-center
                px-4 sm:px-6 md:px-10
                w-full md:w-[25.4163rem]
                h-[3.25rem] sm:h-[3.5rem] md:h-[3.75rem]
                rounded-2xl shadow-lg bg-bg1-color
              "
            >
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="text-color3 w-full mr-3"
                required
              />
              <FaRegUser className="text-color3 shrink-0" />
            </ElementContainer>
          </div>

          <div className="flex flex-col gap-3 sm:gap-6 w-full">
            <label htmlFor="email" className="text-sm sm:text-base">
              Email Address:
            </label>
            <ElementContainer
              border
              className="
                flex justify-between items-center
                px-4 sm:px-6 md:px-10
                w-full md:w-[25.4163rem]
                h-[3.25rem] sm:h-[3.5rem] md:h-[3.75rem]
                rounded-2xl shadow-lg bg-bg1-color
              "
            >
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="text-color3 w-full mr-3"
                required
              />
              <MdOutlineEmail className="text-color3 shrink-0" />
            </ElementContainer>
          </div>
        </div>

        {/* phone number and subject */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex flex-col gap-3 sm:gap-6 w-full">
            <label htmlFor="phone" className="text-sm sm:text-base">
              Phone Number:
            </label>
            <ElementContainer
              border
              className="
                flex justify-between items-center
                px-4 sm:px-6 md:px-10
                w-full md:w-[25.4163rem]
                h-[3.25rem] sm:h-[3.5rem] md:h-[3.75rem]
                rounded-2xl shadow-lg bg-bg1-color
              "
            >
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className="text-color3 w-full mr-3"
                required
              />
              <MdOutlinePhoneEnabled className="text-color3 shrink-0" />
            </ElementContainer>
          </div>

          <div className="flex flex-col gap-3 sm:gap-6 w-full">
            <label htmlFor="subject" className="text-sm sm:text-base">
              Subject:
            </label>
            <ElementContainer
              border
              className="
                flex justify-between items-center
                px-4 sm:px-6 md:px-10
                w-full md:w-[25.4163rem]
                h-[3.25rem] sm:h-[3.5rem] md:h-[3.75rem]
                rounded-2xl shadow-lg bg-bg1-color
              "
            >
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                className="text-color3 w-full mr-3"
                required
              />
              <RxText className="text-color3 shrink-0" />
            </ElementContainer>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-6">
          <label htmlFor="message" className="text-sm sm:text-base">
            Message:
          </label>
          <ElementContainer
            border
            className="
              items-center
              px-4 sm:px-6 md:px-10
              min-h-[8rem] md:h-[123px]
              rounded-2xl shadow-lg bg-bg1-color
            "
          >
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              className="w-full h-full bg-transparent outline-none p-3 sm:p-4 text-color3"
              required
            />
          </ElementContainer>
        </div>

        <div>
          <Button className="mt-4 w-full sm:w-auto px-6 py-2.5 font-bold">
            Send Message
            <ChevronRight className="ml-2" />
          </Button>
        </div>
      </motion.form>
    </motion.section>
  );
};

export default GetInTouch;
