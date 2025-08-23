import { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import ElementContainer from "@/components/common/element-container/ElementContainer";

const menuGalleryItems = [
  "Show All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Graphic Design",
];

const projectsSimulator = [
  {
    id: 1,
    title: "Project One",
    category: "Web Development",
    description: "A web development project.",
  },
  {
    id: 2,
    title: "Project Two",
    category: "Mobile Apps",
    description: "A mobile app project.",
  },
  {
    id: 3,
    title: "Project Three",
    category: "UI/UX Design",
    description: "A UI/UX design project.",
  },
  {
    id: 4,
    title: "Project Four",
    category: "Graphic Design",
    description: "A graphic design project.",
  },
];

// Transiciones tipadas
const springIn: Transition = {
  type: "spring",
  stiffness: 480,
  damping: 34,
  mass: 0.4,
};
const springLayout: Transition = {
  type: "spring",
  stiffness: 340,
  damping: 30,
  mass: 0.5,
};
const exitTween: Transition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };

// Variants tipados (solo para stagger, sin layout en el contenedor)
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springIn,
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.985,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: exitTween,
  },
};

const ProjectsGallery = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Show All");

  const filtered = useMemo(
    () =>
      projectsSimulator.filter(
        (p) => activeMenuItem === "Show All" || p.category === activeMenuItem
      ),
    [activeMenuItem]
  );

  return (
    <section className="flex flex-col items-center mt-16 sm:mt-20 md:mt-24 lg:mt-10 px-4 sm:px-6 lg:px-8">
      <h2>Projects Gallery</h2>

      {/* Menú fijo (sticky) - no participa en animaciones */}
      <div className="w-full max-w-6xl sticky top-0  bg-white/80 dark:bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur mt-3.5">
        <ul className="flex flex-wrap justify-center gap-12 py-2 min-h-[40px]">
          {menuGalleryItems.map((item) => (
            <li
              key={item}
              onClick={() => setActiveMenuItem(item)}
              className={`cursor-pointer transition-colors ${
                activeMenuItem === item ? "text-color0 underline" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="mt-6 w-full flex justify-center h-[25rem]"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        >
          <AnimatePresence mode="wait">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                // layout SOLO en los ítems
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                style={{ overflow: "hidden", willChange: "transform" }}
                whileHover={{ y: -2 }}
                transition={{ layout: springLayout }}
              >
                <ElementContainer className="border p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {project.category}
                  </p>
                  <p className="text-base">{project.description}</p>
                </ElementContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsGallery;
