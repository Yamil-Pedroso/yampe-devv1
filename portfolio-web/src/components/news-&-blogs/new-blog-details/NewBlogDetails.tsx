import { Route } from "../../../routes/new-work-details/$newsBlogsId";
import { newsAndBlogsData } from "@/data/newsAndBlogsData";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import NewsBlogsAside from "@/components/news-&-blogs/news-blogs-aside/NewsBlogsAside";
import { FaShareAlt } from "react-icons/fa";

const NewBlogDetails = () => {
  const { newsBlogsId } = Route.useParams();
  const id = Number(newsBlogsId);

  // No tiene id, solo index
  const newsBlogs = newsAndBlogsData.newsAndBlogs.find(
    (item) => item.id === id
  );

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-center text-2xl font-bold mb-4">Blog Details</h1>

      <div className="flex gap-12 mt-12">
        <ElementContainer className="border border-border-color bg-bg1-color w-[53.125rem] h-auto">
          {newsBlogs ? (
            <div className="flex flex-col p-10">
              <div className="text-color4 mb-2 p-3.5 bg-neutral-700  rounded-2xl">
                <p className="text-center">{newsBlogs.tags.join(", ")}</p>
              </div>
              <div className="w-full flex flex-col items-center mt-5">
                <div className="w-full flex justify-between items-center ">
                  <div className="flex">
                    <div className="flex items-center mb-4">
                      <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-border-color mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900"
                          alt="Icon"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-color4">Post By</p>
                        <p className="text-color4 text-[1.375rem]">
                          {newsBlogs.author}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mr-30">
                    <p className="text-color4">Published</p>
                    <p className="text-color4 text-[1.375rem] mb-2">
                      October {newsBlogs.date}
                    </p>
                  </div>
                  <div>
                    <button
                      aria-label="Previous"
                      className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
                      onClick={() => {}}
                    >
                      <FaShareAlt className="text-color4 text-[21px]" />
                    </button>
                  </div>
                </div>

                <div className="w-[51.1244rem] h-[29.3031rem] overflow-hidden rounded-lg mt-3.5">
                  <img
                    src={newsBlogs.image}
                    alt={newsBlogs.excerpt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-8 text-color4">
                <div className="flex">
                  <div>
                    <span className="flex justify-center items-center  font-bold w-[3.0194rem] h-[3.125rem] bg-color-green text-2xl text-black rounded-[.8rem]">
                      L
                    </span>
                  </div>

                  <div className="ml-5">
                    <p className="text-base/7">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed euismod, nunc ut laoreet aliquam, nunc nisl aliquet
                      nunc, euismod aliquam nunc nisl euismod. Sed euismod, nunc
                      ut
                    </p>
                  </div>
                </div>

                <p className="text-base/7 mt-2.5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  euismod, nunc ut laoreet aliquam, nunc nisl aliquet nunc,
                  euismod aliquam nunc nisl euismod. Sed euismod, nunc ut
                  laoreet aliquam, nunc nisl aliquet nunc, euismod aliquam nunc
                  nisl euismod. Sed euismod, nunc ut laoreet aliquam, nunc nisl
                  aliquet nunc, euismod aliquam nunc nisl euismod. Sed euismod,
                  nunc ut laoreet aliquam, nunc nisl aliquet nunc, euismod
                  aliquam nunc nisl euismod. Sed euismod, nunc ut laoreet
                  aliquam, nunc nisl aliquet nunc, euismod aliquam nunc nisl
                  euismod.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Blog not found.</p>
          )}
        </ElementContainer>

        <NewsBlogsAside keyword="" setKeyword={() => {}} />
      </div>
    </div>
  );
};

export default NewBlogDetails;
