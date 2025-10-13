import { ResumeData } from "@/types/Types";
import { SiAffinitydesigner } from "react-icons/si";
import { MdOutlineDeveloperMode, MdDesignServices } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa6";
import { TbCloudNetwork } from "react-icons/tb";

export const resumeData: ResumeData = {
  header: "My Resume",
  title: "Professional Experience",

  experience: [
    {
      jobTitle: "Principal Frontend Developer",
      company: "Squib Ltd - Luzern Switzerland",
      year: "2022 - 2025",
      icon: SiAffinitydesigner,
    },
    {
      jobTitle: "Full Stack Developer",
      company: "Qiibee AG - Zug Switzerland",
      year: "2021",
      icon: MdOutlineDeveloperMode,
    },
    {
      jobTitle: "Project Support Artist",
      company: "Mundus Vita - Zurich Switzerland",
      year: "2017 - 2018",
      icon: MdDesignServices,
    },
    {
      jobTitle: "Digital and Classic Artist",
      company: "Almost Famous Gallery - Havanna Cuba",
      year: "2014 - 2016",
      icon: FaPaintBrush,
    },
    {
      jobTitle: "Network Engineer and Code mantenance",
      company: "Cada del Alba - Havana Cuba",
      year: "2014 - 2016",
      icon: FaNetworkWired,
    },
    {
      jobTitle: "Network Engineer and Code mantenance",
      company: "UNESCO - Havana Cuba",
      year: "2009 - 2010",
      icon: TbCloudNetwork,
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript"],
};
