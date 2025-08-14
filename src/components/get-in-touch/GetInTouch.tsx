import ElementContainer from "@/components/common/element-container/ElementContainer";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import { RxText } from "react-icons/rx";
import { getInTouchData } from "@/data/getInTouchData";
import Button from "@/components/common/buttons/Button";
import { ChevronRight } from "lucide-react";

const GetInTouch = () => {
  const { header, description } = getInTouchData;
  return (
    <section className="flex justify-center mt-30">
      <div className="flex flex-col gap-4 max-w-[30%]">
        <h2 className="text-color4 font-bold">{header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/13 mt-3.5">
          Let's Talk For your{" "}
          <span className="text-color0 ">Next Projects</span>
        </p>
        <p className="text-color4">{description}</p>

        <div>
          <ul className="flex flex-col gap-4 mt-4">
            {getInTouchData.servicesTags?.map((service, index) => (
              <li key={index} className="flex items-center">
                <div className="flex justify-center items-center w-[1.875rem] h-[1.875rem] rounded-full bg-color0 overflow-hidden">
                  <service.icon className="text-bg1-color text-[1.1rem]" />
                </div>
                <span className="ml-6 text-color4 text-[20px]">
                  {service.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form action="" className="flex flex-col gap-8 mx-4 max-w-[70%]">
        <div className="flex gap-8">
          <div className="flex flex-col gap-6">
            <label htmlFor="name">Full Name:</label>
            <ElementContainer
              border
              className="flex justify-between items-center px-10 w-[25.4163rem] h-[3.75rem] rounded-2xl shadow-lg bg-bg1-color"
            >
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="text-color3"
                required
              />
              <FaRegUser className="text-color3" />
            </ElementContainer>
          </div>
          <div className="flex flex-col gap-6">
            <label htmlFor="email">Email Address:</label>
            <ElementContainer
              border
              className="flex justify-between items-center px-10  w-[25.4163rem] h-[3.75rem] rounded-2xl shadow-lg bg-bg1-color"
            >
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="text-color3"
                required
              />
              <MdOutlineEmail className="text-color3" />
            </ElementContainer>
          </div>
        </div>

        {/*phone number and subject */}
        <div className="flex  gap-8">
          <div className="flex flex-col gap-6">
            <label htmlFor="phone">Phone Number:</label>
            <ElementContainer
              border
              className="flex justify-between items-center px-10  w-[25.4163rem] h-[3.75rem] rounded-2xl shadow-lg bg-bg1-color"
            >
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className="text-color3"
                required
              />
              <MdOutlinePhoneEnabled className="text-color3" />
            </ElementContainer>
          </div>
          <div className="flex flex-col gap-6">
            <label htmlFor="subject">Subject:</label>
            <ElementContainer
              border
              className="flex justify-between items-center px-10  w-[25.4163rem] h-[3.75rem] rounded-2xl shadow-lg bg-bg1-color"
            >
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                className="text-color3"
                required
              />
              <RxText className="text-color3" />
            </ElementContainer>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <label htmlFor="message">Message:</label>
          <ElementContainer
            border
            className="items-center px-10 h-[123px] rounded-2xl shadow-lg bg-bg1-color"
          >
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              className="w-full h-full bg-transparent outline-none p-4 text-color3"
              required
            />
          </ElementContainer>
        </div>
        <div>
          <Button className="mt-4 px-6 py-2.5 font-bold">
            Send Message
            <ChevronRight className="ml-2" />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default GetInTouch;
