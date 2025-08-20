import { worksData } from "@/data/worksData";
import { Route } from "../../../routes/work-details/$worksId";
import ServiceGroups from "@/components/common/service-groups/ServiceGroups";
import ElementContainer from "@/components/common/element-container/ElementContainer";

const tags = ["Web Design", "Mobile Apps", "Branding"];

const shareOptions = ["1", "2", "3"];

const WorkDetails = () => {
  const { worksId } = Route.useParams();
  const id = Number(worksId);

  const work = worksData.projects?.find((project) => project.id === id);

  return (
    <section className="w-full flex flex-col items-center justify-center p-4">
      {work ? (
        <div className="w-full max-w-[80.625rem]">
          {/* Título */}
          <div className="p-4 -mt-1">
            <h1 className="text-[4.6875rem] font-semibold">{work.title}</h1>
            <h2 className="text-[1.125rem] font-semibold">
              Web - Mobile Application Design
            </h2>
          </div>

          <div className="w-full h-[36.875rem] overflow-hidden rounded-md">
            <img
              src={work.imageDetails[0]}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-[1.875rem] font-semibold">
                We Create digital Product For Business
              </h2>
              <h3 className="text-[1rem]">{work.description}</h3>

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
                <h3 className="text-[1rem] text-black">{work.description}</h3>
              </ElementContainer>
            </div>
          </div>

          {/** Image Gallery */}
          <div className="mt-8 grid lg:grid-cols-3 grid-cols-2 gap-4">
            {work.imageDetails
              .slice(1, work.imageDetails.length)
              .map((image, index) => (
                <div
                  className="w-[24rem] h-[16rem] xl:w-[25.625rem] xl:h-[20rem]"
                  key={index}
                >
                  <img
                    src={image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>

          {/* Proyect summery */}
          <div className="mt-8">
            <h2 className="text-[1.875rem] font-semibold">Project Summary</h2>
            <p className="text-[1rem] text-neutral-400 mt-3.5 text-base/7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <ElementContainer
            border
            className="flex justify-between items-center  bg-[#1f1f1f] h-[4.8125rem] px-[1.25rem] py-[2.5rem] mt-12"
          >
            <div className="flex items-center ml-4 gap-4">
              Tags
              <div className="flex flex-wrap gap-2 ">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex justify-center items-center w-[7rem] h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[1rem]"
                  >
                    {tag}
                    {i < tags.length - 1 && ", "}
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

          <div className="mt-26">
            <h2 className="text-[2.8125rem] text-center font-semibold">
              Related Projects
            </h2>
            <div className="mt-8 grid lg:grid-cols-3 grid-cols-2 gap-4">
              {work.imageDetails
                .slice(1, work.imageDetails.length)
                .map((image, i) => (
                  <div key={i}>
                    <div className="w-[24rem] h-[16rem] xl:w-[25.625rem] xl:h-[20rem]">
                      <img
                        src={image}
                        alt={work.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex p-6 px-16">
                      {
                        <div className="flex flex-col gap-3">
                          <span className="block mt-2 text-[1rem] text-color0">
                            {["Web Design", "Mobile Apps", "Branding"][i]}
                          </span>
                          <span className="text-[24px]">
                            {
                              [
                                "Brand Identity Design",
                                "Mobile Apps Design",
                                "Dashboard Development",
                              ][i]
                            }
                          </span>
                        </div>
                      }
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Work not found</p>
      )}
    </section>
  );
};

export default WorkDetails;
