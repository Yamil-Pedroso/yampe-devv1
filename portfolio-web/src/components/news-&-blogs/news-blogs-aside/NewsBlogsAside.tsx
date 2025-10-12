import React, { useMemo } from "react";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import { motion, Variants } from "framer-motion";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useDevtoByTags } from "@/lib/hooks/useDevto";

interface INewsBlogsAsideProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const placeholderImg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%%' height='100%%' fill='%23f3f4f6'/><text x='50%%' y='50%%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='system-ui' font-size='20'>Sin imagen</text></svg>";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeInOut" },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

const provisionalCategories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
  { id: 5, name: "Category 5" },
  { id: 6, name: "Category 6" },
];

const TAGS = ["react", "typescript", "javascript"];

const NewsBlogsAside = ({ keyword, setKeyword }: INewsBlogsAsideProps) => {
  const { data = [] } = useDevtoByTags(TAGS, 24);

  const allItems = useMemo(
    () =>
      data.map((a) => ({
        id: a.id,
        img: a.image ?? null,
        tags: a.tags ?? [],
        title: a.title,
        createdAt: a.publishedAt?.getTime() ?? 0,
      })),
    [data]
  );

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((it) => {
      const inTitle = it.title.toLowerCase().includes(q);
      const inTags = it.tags.some((t) => t.toLowerCase().includes(q));
      return inTitle || inTags;
    });
  }, [allItems, keyword]);

  const handleClickTag = (tag: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setKeyword(tag);
  };

  const dt = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Zurich",
  });

  return (
    <div className="">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className=""
      >
        <ElementContainer className="flex flex-col xs:w-[28rem] xl:w-[32rem] xl:h-auto bg-bg1-color p-[2rem] border border-border-color cursor-pointer">
          <div className="relative w-full">
            <h3 className="mt-5 text-color4 text-[1.25rem]">Search</h3>
            <hr className="my-5 border-t border-border-color" />
            <input
              type="text"
              placeholder="Keywords..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-4 border border-border-color rounded-2xl bg-bg1-color text-color4 focus:outline-none relative"
            />
            <FaSearch className="absolute right-6 top-28 text-color0" />
          </div>

          {/* Categories */}
          <div>
            <h3 className="mt-5 text-color4 text-[1.25rem]">Categories</h3>
            <hr className="my-5 border-t border-border-color" />
            <ul className="mt-2">
              {provisionalCategories.map((category) => (
                <li key={category.id} className="mb-4">
                  <a
                    href="#"
                    className="flex items-center text-color3 hover:text-color0"
                  >
                    <IoIosArrowForward />
                    <p className="ml-2 text-[1.125rem]">{category.name}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="mt-5 text-color4 text-[1.25rem]">Latest News</h3>
            <hr className="my-5 border-t border-border-color" />
            <div className="mt-2 ">
              {filtered.slice(0, 5).map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: (i % 5) * 0.05 }}
                  className="flex mb-4"
                >
                  <div className="w-[4.0625rem] h-[4.0625rem] overflow-hidden rounded-full">
                    <img
                      src={item.img ?? placeholderImg}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col text-color2 hover:text-color0 ml-6">
                    <div className="flex items-center text-color2 text-[1rem]">
                      <FaCalendarAlt className="inline mr-1" />
                      <span className="ml-2">
                        {item.createdAt
                          ? dt.format(new Date(item.createdAt))
                          : "—"}
                      </span>
                    </div>

                    <p className="ml-2 text-[1.125rem] max-w-[18rem] hover:underline">
                      {item.title}
                    </p>
                    <hr className="my-5 border-t border-border-color" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <h3 className="mt-5 text-color4 text-[1.25rem]">Popular Tags</h3>
          <hr className="my-5 border-t border-border-color" />
          <div className="flex flex-wrap gap-3 mt-5">
            {allItems
              .flatMap((item) => item.tags)
              .filter(Boolean)
              .slice(0, 20)
              .map((tag, tagIndex) => (
                <a
                  href="#"
                  key={`${tag}-${tagIndex}`}
                  onClick={handleClickTag(tag)}
                  className="flex justify-center items-center w-[7rem] h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[1.1rem] group"
                >
                  <span className="group-hover:text-color0">{tag}</span>
                </a>
              ))}
          </div>
        </ElementContainer>
      </motion.div>
    </div>
  );
};

export default NewsBlogsAside;
