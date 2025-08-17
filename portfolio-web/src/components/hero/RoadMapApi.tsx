import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoRocket } from "react-icons/go";
import { FaGear } from "react-icons/fa6";
import styles from "./gear.module.css";

interface RoadMapAniProps {}
const RoadMapAni = () => {
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const sequence = [
      { delay: 1000, section: "Fundamentals" },
      { delay: 19000, section: "Web Apps" },
      { delay: 37000, section: "Apps" },
      { delay: 55000, section: "Backend" },
      { delay: 73000, section: "Web Games" },
      { delay: 91000, section: "Game Engines" },
      { delay: 109000, section: "Advanced" },
      { delay: 127000, section: "Build Projects" },
    ];

    sequence.forEach(({ delay, section }) => {
      setTimeout(() => {
        setCurrentSection(section);
      }, delay);
    });
  }, []);

  const groups: { [key: string]: string[] } = {
    Fundamentals: [
      "HTML",
      "CSS",
      "JavaScript",
      "Typescript",
      "Next.js",
      "C#",
      "Python",
      "+ ChatGPT",
      "Feedback",
    ],
    "Web Apps": [
      "Frontend",
      "React",
      "Angular",
      "Next.js",
      "Tailwind CSS",
      "Shadcn",
      "TanStack...",
    ],
    Apps: [
      "React Native",
      "Expo",
      "PWA",
      "Navigation",
      "State",
      "Animation",
      "Refactor...",
    ],
    Backend: ["Node.js", "Express", "Django", "APIs", "DB", "SQL", "NoSQL..."],
    "Web Games": ["Three.js", "Pixi.js", "Shaders", "physics", "ChatGPT"],
    "Game Engines": ["Unity(C#)", "Scripts", "Maths"],
    Advanced: [
      "Integrate ChatGPT",
      "DALL-E",
      "DevOps",
      "CI/CD",
      "Docker",
      "Testing",
      "Security",
      "Performance",
    ],
    "Build Projects": ["CRUD", "Portfolio", "Clone", "Games"],
  };

  const rocketIcons = [
    <GoRocket size={64} className="text-color0" />,
    <GoRocket className="text-color0" />,
  ];

  const renderSection = (items: string[], baseDelay: number, top: string) => {
    const duration = 12; // Más lento y elegante
    return (
      <div className="" style={{ top, height: "10%" }}>
        {items.map((text, i) => {
          const delay = baseDelay + i * 1.0;

          return (
            <motion.div
              key={i}
              initial={{ x: -300 }}
              animate={{ x: 1000 }}
              transition={{
                delay,
                duration,
                ease: "easeInOut",
              }}
            >
              <span className="text-color0">{text}</span>
            </motion.div>
          );
        })}
        {rocketIcons.map((n, i) => (
          <motion.div
            key={`rocket-${i}`}
            initial={{ x: -150 - i * 10 }}
            animate={{ x: 1000 - i * 10, opacity: [0.8 / (i + 1), 0.1, 0] }}
            transition={{
              delay: baseDelay + i * 1.0,
              duration,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <span className=" top-[-10rem] text-color0 inline-block rotate-45">
              {n}
            </span>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full absolute  pointer-events-none object-cover ">
      <AnimatePresence mode="wait">
        {currentSection && (
          <motion.h2
            key={currentSection}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1 }}
            className="top-[5%] left-[10%] text-2xl font-bold"
          >
            <div className="flex items-center gap-2">
              <FaGear
                size={24}
                className={`text-color0 animate-spin !duration-[4s]
                ${styles.gearIcon}`}
              />{" "}
              <span className="text-color0">{currentSection}</span>
            </div>
          </motion.h2>
        )}
      </AnimatePresence>

      {Object.entries(groups).map(([groupName, groupItems]) =>
        currentSection === groupName
          ? renderSection(groupItems, 0.5, "15%")
          : null
      )}
    </div>
  );
};

export default RoadMapAni;
