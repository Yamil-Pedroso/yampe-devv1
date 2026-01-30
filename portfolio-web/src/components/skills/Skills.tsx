import { skillsData } from "@/data/skillsData";
import { motion, Variants } from "framer-motion";
import DarkContainer from "../common/containers/DarkContainer";
import SkillsPeriodicGrid from "./SkillsPeriodicGrid";

const headerVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Skills: React.FC = () => {
  return (
    <DarkContainer className="mx-auto flex flex-col gap-16">
      {/* Copy */}
      <motion.div
        id="skills"
        variants={headerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="flex flex-col text-center max-w-[34rem] max-[40rem]:px-4 max-[40rem]:mb-8 "
      >
        {skillsData.header && (
          <p className="mb-2 text-color4 max-[40rem]:text-sm desktop:text-3xl">
            {skillsData.header}
          </p>
        )}
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14 max-[40rem] mobile:text-[4rem]">
          Let’s Explore my{" "}
          <span className="text-green-500 ">Skills & Experience</span>
        </p>
        {skillsData.title && (
          <h2 className="text-[2.25rem] leading-tight max-[40rem] ">
            {skillsData.title}
          </h2>
        )}
        {skillsData.description && (
          <p className="text-color4/80 mt-2.5 max-[40rem]:text-sm desktop:text-[1.5rem] text-base/7">
            {skillsData.description}
          </p>
        )}
      </motion.div>
      <SkillsPeriodicGrid />
    </DarkContainer>
  );
};

export default Skills;
