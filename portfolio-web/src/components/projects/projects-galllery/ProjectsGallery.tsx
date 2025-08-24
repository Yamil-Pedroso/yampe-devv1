import { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import { useProjects } from "@/lib/hooks/useProjects";
import { toAbs } from "@/lib/url";

const menuGalleryItems = [
  "Show All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Mini Apps",
  "Graphic Design",
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

type SimpleProject = {
  id: string;
  title: string;
  category?: string;
  description?: string;
  image?: string;
  link?: string;
};

const ProjectsGallery = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Show All");

  // Trae del backend (puedes pasar filtros/paginación si quieres)
  const { data, isLoading } = useProjects({
    status: "published",
    sort: "order",
    limit: 1000,
  });

  const items: SimpleProject[] = useMemo(
    () =>
      (data?.projects ?? []).map((p) => ({
        id: p._id,
        title: p.title,
        category: p.category,
        description: p.description,
        image: p.image ? toAbs(p.image) : undefined,
        link: p.link,
      })),
    [data]
  );

  const filtered = useMemo(
    () =>
      items.filter(
        (p) => activeMenuItem === "Show All" || p.category === activeMenuItem
      ),
    [items, activeMenuItem]
  );

  return (
    <section className="flex flex-col items-center mt-16 sm:mt-20 md:mt-24 lg:mt-10 px-4 sm:px-6 lg:px-8">
      <h2>Projects Gallery</h2>

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

      {/* Content*/}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="mt-6 w-full flex justify-center h-[40rem]"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        >
          <AnimatePresence initial={false}>
            {!isLoading &&
              filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  style={{ overflow: "hidden", willChange: "transform" }}
                  whileHover={{ y: -2 }}
                  transition={{ layout: springLayout }}
                >
                  <ElementContainer className="border p-4 rounded-lg h-[100%] ">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[5rem] object-cover mb-4 rounded-md"
                      />
                    )}
                    <h3 className="text-lg font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project.category}
                    </p>
                    <p className="text-base">{project.description}</p>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Project
                    </a>
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
