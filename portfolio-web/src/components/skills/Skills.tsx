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
          <p className="mb-2 text-color4 max-[40rem]:text-sm">
            {skillsData.header}
          </p>
        )}
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14 max-[40rem]:text-[2rem]">
          Let’s Explore my{" "}
          <span className="text-color0">Skills & Experience</span>
        </p>
        {skillsData.title && (
          <h2 className="text-[2.25rem] leading-tight max-[40rem]:text-[1.5rem]">
            {skillsData.title}
          </h2>
        )}
        {skillsData.description && (
          <p className="text-color4/80 mt-2.5 max-[40rem]:text-sm">
            {skillsData.description}
          </p>
        )}

        {/*<div className="mt-8">
          <Button
            initial="hidden"
            animate="show"
            variants={ctaEnter}
            transition={{ delay: 0.35 }}
            whileHover={ctaHover}
            whileTap={ctaTap}
            className="cursor-pointer group"
          >
            <p className="font-bold max-[40rem]:text-sm">Explore More</p>
            <span>
              <IoIosArrowForward
                className="group-hover:ml-2 transition-all duration-300"
                size={20}
              />
            </span>
          </Button>
        </div> */}
      </motion.div>

      <SkillsPeriodicGrid />
    </DarkContainer>
  );
};

export default Skills;
