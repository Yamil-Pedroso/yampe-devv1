import { AboutMeData } from "../types/Types";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
const text = "Problema Solutions";

export const aboutMeData: AboutMeData = {
  header: "About Me",
  title: `Professional ${text} For Digital Products`,
  description:
    "At vero eos et accusamus et odio dignissimos ducimus praesentium voluptatum corrupti quos dolores quas molestias excepturi sint occaecati cupiditate provident qui officia deserunt mollitia animi, id est laborum et dolorum.",
  features: [
    { text: "Frontend Development", icon: FaCheck },
    { text: "Backend Development", icon: FaCheck },
    { text: "React Native Development", icon: FaCheck },
    { text: "UI/UX", icon: FaCheck },
    { text: "Digital Art", icon: FaCheck },
    { text: "Hosting", icon: FaCheck },
  ],
  image: "/images/about/yami.jpg",
  infoContact: [
    {
      text1: "Email:",
      text2: "yamilpedroso@gmail.com",
      icon: MdOutlineMailOutline,
    },
    {
      text1: "Give me a Call:",
      text2: " +41 79 532 65 19",
      icon: MdOutlinePhone,
    },
  ],
  roleTags: [
    { text: "Experience Designer", icon: "/icons/experience.svg" },
    { text: "Mark J. Collins", icon: "/icons/user.svg" },
  ],
};
