import { WorksData } from "@/types/Types";
import { MdOutlineArrowOutward } from "react-icons/md";

export const worksData: WorksData = {
  header: "My Works",
  projects: [
    {
      title: "Liminal",
      subtitle: "Creative Studio",
      description:
        "A creative studio operating at the threshold of design and innovation crafting bold, immersive, and unconventional experiences.",
      link: "https://liminal-devv1.netlify.app/",
      image: "/images/works/work_1.png",
      icon: MdOutlineArrowOutward,
    },
    {
      title: "SQUIB Ltd.",
      subtitle: "Startup",
      description:
        "Die einfachste Art, attraktive Umfragen zu erstellen, die alle deine Zielgruppen lieben werden.",
      link: "https://www.squib.app/",
      image: "/images/works/work_2.png",
      icon: MdOutlineArrowOutward,
    },
    {
      title: "Product Design",
      subtitle: "Inspired Design Lab",
      description:
        "Creative design studio specializing in meeting the needs of the new generation. We offer innovative and cutting-edge design solutions to help our clients stand out in today's fast-paced.",
      link: "https://creative-design-studio-nine.vercel.app/",
      image: "/images/works/work_3.png",
      icon: MdOutlineArrowOutward,
    },
    {
      title: "Startup Agency",
      subtitle: "Web Design Lab",
      description:
        "Dynamic and innovative organization that provides comprehensive support, guidance and resources to early stage startups.",
      link: "https://startup-agency-chi.vercel.app/",
      image: "/images/works/work_4.png",
      icon: MdOutlineArrowOutward,
    },
  ],
};
