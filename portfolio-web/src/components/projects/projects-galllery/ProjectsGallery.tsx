import { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Route as projectsRoute } from "@/routes/project-details/$projectId";
import { useProjects } from "@/lib/hooks/useProjects";
import { toAbs } from "@/lib/url";
import BlockwithhHover from "@/components/common/hovers/BlockwithHover";
import MorphCTA from "@/components/common/animation/morphism/MorphCTA";
import { MdSettingsApplications } from "react-icons/md";

const menuGalleryItems = [
  "Show All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Mini Apps",
  "Graphic Design",
];

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

const upcomingVariants: Variants = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 0, transition: exitTween },
};

type SimpleProject = {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  description?: string;
  image?: string;
  link?: string;
};

type UpcomingApp = {
  id: string;
  title: string;
  note?: string;
};

const upcomingApps: UpcomingApp[] = [
  { id: "up-1", title: "Lorem Ipsum", note: "Lorem • Coming soon" },
  { id: "up-2", title: "Lorem Ipsum", note: "Lorem • Coming soon" },
  { id: "up-3", title: "Lorem Ipsum", note: "Lorem • Coming soon" },
  { id: "up-4", title: "Lorem Ipsum", note: "Lorem • Coming soon" },
];

const ProjectsGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState("Show All");

  const navigate = useNavigate();

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleProjectsClick = (projectId: string) => {
    navigate({
      to: projectsRoute.to,
      params: { projectId },
    });
  };

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
        subtitle: p.subtitle,
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
      <h2 className="text-[4.6875rem]">Projects Gallery</h2>

      <div className="w-full max-w-6xl sticky top-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur mt-3.5">
        <ul className="flex flex-wrap justify-center gap-12 py-2 min-h-[40px]">
          {menuGalleryItems.map((item) => (
            <li
              key={item}
              onClick={() => setActiveMenuItem(item)}
              className={`cursor-pointer transition-colors text-[1.125rem]  ${
                activeMenuItem === item
                  ? "relative after:block after:w-[3rem] after:h-[3px] text-color0 after:bg-color0 after:mt-3"
                  : "text-color3"
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
        className="mt-6 w-full flex justify-center h-auto"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-7xl"
        >
          <AnimatePresence initial={false}>
            {!isLoading &&
              filtered.map((project, i) => (
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
                  className="m-2 cursor-pointer"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BlockwithhHover>
                      <div
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                          transition: "filter 0.3s ease",
                          filter:
                            hoveredIndex === i
                              ? "blur(5px) brightness(80%)"
                              : "none",
                        }}
                        className="relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[39.375/25] bg-bg3-color overflow-hidden"
                      >
                        {project.image && (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                      </div>
                    </BlockwithhHover>
                  </a>

                  <div className="mt-2.5 p-6 px-14">
                    <p className="text-color0 mb-4">{project.subtitle}</p>
                    <p className="text-[1.875rem] mb-4">
                      {project.description?.split(" ").slice(0, 3).join(" ")}...
                    </p>

                    <div className="mt-2">
                      <MorphCTA
                        onClick={() => handleProjectsClick(project.id)}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

            {upcomingApps.map((app) => (
              <motion.div
                key={app.id}
                layout="position"
                variants={upcomingVariants}
                initial={false}
                animate="show"
                exit="exit"
                style={{ overflow: "hidden", willChange: "transform" }}
                whileHover={{ y: -2 }}
                transition={{ layout: springLayout }}
                className="m-2"
              >
                <BlockwithhHover>
                  <div className="flex justify-center items-center relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[39.375/25] bg-bg1-color overflow-hidden rounded-md">
                    <MdSettingsApplications size={64} className="text-color3" />
                  </div>
                </BlockwithhHover>

                <div className="mt-2.5 p-6 px-14">
                  <p className="text-color0 mb-2">
                    {app.note ?? "Coming soon"}
                  </p>
                  <p className="text-[1.875rem] mb-4">{app.title}</p>

                  <div className="mt-2 opacity-60 pointer-events-none">
                    <MorphCTA onClick={() => {}} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <h3 className="sr-only">Upcoming Apps</h3>
    </section>
  );
};

export default ProjectsGallery;
