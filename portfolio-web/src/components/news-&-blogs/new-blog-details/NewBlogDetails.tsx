import { Route } from "../../../routes/new-work-details/$newsBlogsId";
import { newsAndBlogsData } from "@/data/newsAndBlogsData";

const NewBlogDetails = () => {
  const { newsBlogsId } = Route.useParams();
  const id = Number(newsBlogsId);

  // No tiene id, solo index
  const newsBlogs = newsAndBlogsData.newsAndBlogs.find(
    (item) => item.id === id
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Blog Details</h1>
      {newsBlogs ? (
        <div className="flex flex-col justify-center items-center p-4">
          <img
            src={newsBlogs.image}
            alt={newsBlogs.excerpt}
            className="w-[20rem] h-auto rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{newsBlogs.excerpt}</h2>
          <p className="text-gray-600 mb-2">
            Tags: {newsBlogs.tags.join(", ")}
          </p>
          <p className="text-gray-500">
            {newsBlogs.date} - {newsBlogs.author}
          </p>
        </div>
      ) : (
        <p className="text-center text-red-500">Blog not found.</p>
      )}
    </div>
  );
};

export default NewBlogDetails;
