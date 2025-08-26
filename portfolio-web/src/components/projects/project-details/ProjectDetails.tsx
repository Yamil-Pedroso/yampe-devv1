import { Route } from "@/routes/project-details/$projectId";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import ServiceGroups from "@/components/common/service-groups/ServiceGroups";
import { useProject } from "@/lib/hooks/useProjects";
import { toAbs } from "@/lib/url";

const tags = ["Web Design", "Mobile Apps", "Branding"]; // (Use this from the backend)

const shareOptions = ["1", "2", "3"];

const ProjectDetails = () => {
  const { projectId } = Route.useParams();

  const { data, isLoading, isError } = useProject(projectId);

  if (isLoading) return <section className="p-4 mt-20">Loading...</section>;
  if (isError || !data)
    return <section className="p-4 mt-20">Work not found</section>;

  const project = data; // viene del hook: ProjectDTO
  const hero = project.image ? toAbs(project.image) : undefined;
  const images = (project.imageDetails ?? []).map(toAbs);

  return (
    <section className="w-full flex flex-col items-center justify-center p-4 mt-20">
      <div className="w-full max-w-[80.625rem]">
        {/* Título */}
        <div className="p-4 -mt-1">
          <h1 className="text-[4.6875rem] font-semibold">{project.title}</h1>
          <h2 className="text-[1.125rem] font-semibold ">
            Web - Mobile
            <span className="ml-3 text-color0">Application Design</span>
          </h2>
        </div>

        {/* Hero */}
        {hero && (
          <div className="w-full h-[36.875rem] overflow-hidden rounded-md mt-20">
            <img
              src={hero}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-[1.875rem] font-semibold">
              We Create digital Product For Business
            </h2>
            <h3 className="text-[1rem]">{project.description}</h3>

            <div className="mt-6">
              <ServiceGroups />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <ElementContainer className="bg-color0 p-16">
              <h2 className="text-[1.875rem] font-semibold text-black">
                We Create digital Product For Business
              </h2>
              <h3 className="text-[1rem] text-black">{project.description}</h3>
            </ElementContainer>
          </div>
        </div>

        {/* Image Gallery */}
        {images.length > 1 && (
          <div className="mt-16 grid lg:grid-cols-3 grid-cols-2 gap-4">
            {images.slice(1).map((image, index) => (
              <div
                className="w-[24rem] h-[16rem] xl:w-[25.625rem] xl:h-[20rem]"
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
          <h2 className="text-[1.875rem] font-semibold">Project Summary</h2>
          <p className="text-[1rem] text-neutral-400 mt-3.5 text-base/7">
            {project.description}
          </p>
        </div>

        <ElementContainer
          border
          className="flex justify-between items-center  bg-[#1f1f1f] h-[4.8125rem] px-[1.25rem] py-[2.5rem] mt-12"
        >
          <div className="flex items-center ml-4 gap-4">
            Tags
            <div className="flex flex-wrap gap-2 ">
              {(project.tags ?? tags).map((tag, i) => (
                <span
                  key={i}
                  className="flex justify-center items-center w-[7rem] h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[1rem]"
                >
                  {tag}
                  {i < (project.tags ?? tags).length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mr-4">
            Share
            <div className="flex gap-2">
              {shareOptions.map((option, i) => (
                <span
                  key={i}
                  className="flex justify-center items-center w-[2.1875rem] h-[2.1875rem] rounded-full bg-neutral-900"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </ElementContainer>

        {/* Related (placeholder con mismas imágenes) */}
        {images.length > 1 && (
          <div className="mt-26">
            <h2 className="text-[2.8125rem] text-center font-semibold">
              Related Projects
            </h2>
            <div className="mt-8 grid lg:grid-cols-3 grid-cols-2 gap-4">
              {images.slice(1).map((image, i) => (
                <div key={i}>
                  <div className="w-[24rem] h-[16rem] xl:w-[25.625rem] xl:h-[20rem]">
                    <img
                      src={image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex p-6 px-16">
                    <div className="flex flex-col gap-3">
                      <span className="block mt-2 text-[1rem] text-color0">
                        {["Web Design", "Mobile Apps", "Branding"][i % 3]}
                      </span>
                      <span className="text-[24px]">
                        {
                          [
                            "Brand Identity Design",
                            "Mobile Apps Design",
                            "Dashboard Development",
                          ][i % 3]
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
