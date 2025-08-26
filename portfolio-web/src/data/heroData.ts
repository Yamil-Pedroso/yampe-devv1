import { HeroData } from "../types/Types";
import { MdArrowForwardIos } from "react-icons/md";

export const heroData: HeroData = {
  greeting: "Hello, I’m",
  name: "Yamil Pedroso",
  role: "Full Stack Dev",
  city: "Based in Zürich",
  description:
    "Crafting high-quality, scalable, and visually engaging digital experiences through modern web technologies.",
  buttons: [
    { text: "Start the Journey", href: "/contact", icon: MdArrowForwardIos },
    { text: "Download Resume", href: "/resume.pdf", icon: MdArrowForwardIos },
  ],
  image: {
    src: "#",
    alt: "Yamil Pedroso smiling and pointing",
  },
  stats: [
    { value: "∞", label: "Cups of Coffee ☕" },
    { value: "120k+", label: "Project Complete" },
    { value: "99k+", label: "Client Satisfactions" },
  ],
};
