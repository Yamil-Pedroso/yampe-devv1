import { Route } from "@/routes/project-details/$projectId";
import { useNavigate } from "@tanstack/react-router";
import { Route as projectsRoute } from "@/routes/project-details/$projectId";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import ServiceGroups from "@/components/common/service-groups/ServiceGroups";
import { useProject, useProjects } from "@/lib/hooks/useProjects";
import { toAbs } from "@/lib/url";
import { TbPointFilled } from "react-icons/tb";

const tags = [
  "react",
  "typescript",
  "framer-motion",
  "nodejs",
  "express",
  "mongodb",
];

const shareOptions = ["1", "2", "3"];

const ProjectDetails = () => {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();

  const handleProjectsClick = (projectId: string) => {
    navigate({
      to: projectsRoute.to,
      params: { projectId },
    });
  };

  const { data, isLoading, isError } = useProject(projectId);
  const {
    data: allProjects = [],
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useProjects();

  if (isLoading || isLoadingAll)
    return (
      <section className="p-4 sm:p-6 lg:p-8 mt-16 sm:mt-20">Loading...</section>
    );
  if (isError || isErrorAll || !data)
    return (
      <section className="p-4 sm:p-6 lg:p-8 mt-16 sm:mt-20">
        Work not found
      </section>
    );

  const project = data; // viene del hook: ProjectDTO
  const hero = project.image ? toAbs(project.image) : undefined;
  const images = (project.imageDetails ?? []).map(toAbs);

  const related = allProjects
    .filter((p) => p._id !== project._id && p.category === project.category)
    .slice(0, 3);

  const textsPanel = [
    {
      title: "Category",
      content: project.category,
    },
    {
      title: "Clients",
      content: "Lorem Ipsum",
    },
    {
      title: "Location",
      content: "Lorem Ipsum",
    },
    {
      title: "Published",
      content: new Date().toLocaleDateString(),
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 mt-16 sm:mt-20">
      <div className="w-full max-w-[80.625rem] mx-auto">
        {/* Título */}
        <div className="flex justify-between p-4 -mt-1">
          <div>
            <h1 className="font-semibold leading-tight text-3xl sm:text-4xl md:text-5xl xl:text-[4.6875rem]">
              {project.title}
            </h1>
            <h2 className="font-semibold text-sm sm:text-base md:text-md mt-2">
              {project.category}
              <TbPointFilled className="inline-block ml-2  text-md" />
              <span className="ml-2 text-color0 text-[22px]">
                {project.subtitle}
              </span>
            </h2>
          </div>

          <div className="flex items-end hover:underline hover:text-color0 transition-all duration-300">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Demo
            </a>
          </div>
        </div>

        {/* Hero */}
        {hero && (
          <div className="flex justify-center w-full h-56 sm:h-72 md:h-[28rem] lg:h-[36.875rem] bg-bg3-color sm:mt-20 ">
            <img
              src={hero}
              alt={project.title}
              className={` ${project.category === "Mini Apps" ? "w-[22rem] object-contain" : "w-full h-full object-contain"}`}
            />
          </div>
        )}

        <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6 lg:gap-8">
          {/* Left Column */}
          <div>
            <h2 className="font-semibold text-2xl sm:text-3xl">
              We Create digital Product For Business
            </h2>
            <h3 className="text-base sm:text-lg mt-3">{project.description}</h3>

            <div className="mt-6">
              <ServiceGroups />
            </div>
          </div>

          {/* Right Column */}

          <ElementContainer className="bg-color0 p-6 sm:p-8 lg:p-16 relative">
            <div className="flex flex-col gap-5 ">
              {textsPanel.map((text, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-black text">{text.title}</span>
                  <h5>
                    <span className="text-black text-[1.375rem] font-semibold">
                      {text.content}
                    </span>
                  </h5>
                </div>
              ))}

              {/* Create 2 transparent squares, that have position absolute and different size and are insite its parent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-black opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-black opacity-50"></div>
            </div>
          </ElementContainer>
        </div>

        {/* Image Gallery */}
        {images.length > 1 && (
          <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {images.slice(0).map((image, index) => (
              <div
                className="w-full h-48 sm:h-56 md:h-64 xl:h-80 bg-bg3-color overflow-hidden"
                key={index}
              >
                <img
                  src={image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Project summary (placeholder) */}
        <div className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Project Summary
          </h2>
          <p className="text-neutral-400 mt-3.5 text-base sm:text-lg">
            {project.description}
          </p>
        </div>

        {/* Tasks block */}
        <ElementContainer
          border
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1f1f1f] h-auto sm:h-[4.8125rem] min-h-[4.8125rem] px-[1.25rem] py-[1.25rem] sm:py-[2.5rem] mt-12 gap-4"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center ml-0 sm:ml-4 gap-3 sm:gap-4">
            <span className="text-sm sm:text-base">Tags</span>
            <div className="flex flex-wrap gap-2">
              {(project.tags ?? tags).map((tag, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center px-4 sm:px-5 h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-sm sm:text-[1rem]"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 sm:gap-4 mr-0 sm:mr-4">
            <span className="text-sm sm:text-base">Share</span>
            <div className="flex gap-2">
              {shareOptions.map((option, i) => (
                <span
                  key={i}
                  className="flex justify-center items-center w-8 h-8 sm:w-[2.1875rem] sm:h-[2.1875rem] rounded-full bg-neutral-900 text-sm"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </ElementContainer>

        {/* Related */}
        <div className="mt-16">
          <h2 className="text-center font-semibold text-2xl sm:text-3xl md:text-[2.8125rem]">
            Related Projects
          </h2>

          {/* Related Projects Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {related.map((p) => (
              <div
                key={p._id}
                className="group cursor-pointer"
                onClick={() => handleProjectsClick(p._id)}
              >
                <div className="relative w-full h-48 sm:h-56 md:h-64 xl:h-80 overflow-hidden bg-bg3-color">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex flex-col gap-1.5 px-4 sm:px-6 py-4 sm:py-6">
                  <p className="text-color0 text-sm sm:text-base truncate">
                    {p.subtitle ?? p.title}
                  </p>
                  <p className="text-lg sm:text-xl">
                    {p.description?.split(" ").slice(0, 3).join(" ")}..
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
