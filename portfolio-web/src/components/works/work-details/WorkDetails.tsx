import { worksData } from "@/data/worksData";
import { Route } from "../../../routes/work-details/$worksId";

const WorkDetails = () => {
  const { worksId } = Route.useParams();
  const id = Number(worksId);

  const work = worksData.projects?.find((project) => project.id === id);

  return (
    <section className="flex flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-xl font-bold">Work Details</h1>
      {work ? (
        <div className=" w-full max-w-[60rem]">
          {/* Imagen */}
          <div className="w-full overflow-hidden">
            <img
              src={work.imageDetails[0]}
              alt={work.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Texto pegado a la imagen */}
          <div className="p-4 -mt-1">
            <h2 className="text-lg font-semibold">{work.title}</h2>
            <p className="text-sm text-gray-600">{work.description}</p>
          </div>
        </div>
      ) : (
        <p>Work not found</p>
      )}
    </section>
  );
};

export default WorkDetails;
