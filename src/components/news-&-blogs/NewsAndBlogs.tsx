import DarkContainer from "../common/containers/DarkContainer";
import { newsAndBlogsData } from "@/data/newsAndBlogs";
import ElementContainer from "../common/element-container/ElementContainer";

const NewsAndBlogs = () => {
  const { header, newsAndBlogs } = newsAndBlogsData;

  return (
    <DarkContainer className="flex flex-col justify-center mt-30">
      <div className="text-center">
        <h2 className="text-color4 font-bold">{header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14">
          Latest News <span className="text-color0">Blogs</span>
        </p>
      </div>

      <div className="flex gap-8">
        {newsAndBlogs.map((item, index) => (
          <ElementContainer
            key={index}
            className="flex justify-center items-center mb-4 w-[39.375rem] h-[22rem] bg-bg1-color p-4 gap-10 "
          >
            <div className="w-[18.125rem] h-[20.625rem] rounded-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.excerpt}
                className="w-full h-full object-cover brightness-95"
              />
            </div>

            <div className="flex flex-col flex-1 gap-12 p-4">
              <div className="flex gap-2 mt-2">
                {item.tags.map((tag, tagIndex) => (
                  <a
                    href="#"
                    key={tagIndex}
                    className="flex justify-center items-center w-[7rem] h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[1.1rem] group"
                  >
                    <span className="group-hover:text-color0">{tag}</span>
                  </a>
                ))}
              </div>
              <h3 className="text-color4 text-[22px]">{item.excerpt}</h3>

              <div className="flex">
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="text-gray-400" />}
                </div>
                <p className=" text-gray-500 ml-3">
                  {item.date} - {item.author}
                </p>
              </div>
            </div>
          </ElementContainer>
        ))}
      </div>
    </DarkContainer>
  );
};

export default NewsAndBlogs;
