import React, { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import { Route as NewsBlogsRoute } from "@/routes/new-work-details/$newsBlogsId";
import { motion, Variants } from "framer-motion";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useDevtoByTags } from "@/lib/hooks/useDevto";

type Category = {
  id: string | number;
  name: string;
  slug?: string;
};
interface INewsBlogsAsideProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  categories?: Category[];
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

const TAGS = ["react", "typescript", "javascript"];

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: "Web", slug: "web" },
  { id: 2, name: "Frontend", slug: "frontend" },
  { id: 3, name: "Backend", slug: "backend" },
  { id: 4, name: "UI/UX", slug: "ui-ux" },
  { id: 5, name: "DevOps", slug: "devops" },
  { id: 6, name: "AI", slug: "ai" },
];

const NewsBlogsAside = ({
  keyword,
  setKeyword,
  categories,
}: INewsBlogsAsideProps) => {
  const { data = [] } = useDevtoByTags(TAGS, 24);
  const cats = categories?.length ? categories : DEFAULT_CATEGORIES;
  const [inputTerm, setInputTerm] = useState(keyword);
  const navigate = useNavigate();

  const handleNewsAndBlogsClick = (newsBlogsId: number) => {
    navigate({
      to: NewsBlogsRoute.to,
      params: { newsBlogsId: String(newsBlogsId) },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(inputTerm.trim());
  };

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

  const handleClickCategory = (cat: Category) => (e: React.MouseEvent) => {
    e.preventDefault();

    setKeyword((cat.slug ?? cat.name).toLowerCase());
  };

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
          <form onSubmit={handleSubmit} className="relative w-full">
            <h3 className="mt-5 text-color4 text-[1.25rem]">Search</h3>
            <hr className="my-5 border-t border-border-color" />
            <input
              type="text"
              placeholder="Keywords..."
              value={inputTerm}
              onChange={(e) => setInputTerm(e.target.value)}
              className="w-full p-4 pr-12 border border-border-color rounded-2xl bg-bg1-color text-color4 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-4 top-[80%] -translate-y-1/2 cursor-pointer"
            >
              <FaSearch className="text-color0" />
            </button>
          </form>

          {/* Categories */}
          <div>
            <h3 className="mt-5 text-color4 text-[1.25rem]">Categories</h3>
            <hr className="my-5 border-t border-border-color" />
            <ul className="mt-2">
              {(cats ?? []).map((cat) => (
                <li key={cat.id} className="mb-4">
                  <button
                    type="button"
                    onClick={handleClickCategory(cat)}
                    className="flex items-center text-left text-color3 hover:text-color0"
                  >
                    <IoIosArrowForward />
                    <span className="ml-2 text-[1.125rem]">{cat.name}</span>
                  </button>
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
                  onClick={() => handleNewsAndBlogsClick(Number(item.id))}
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
                  className="flex justify-center items-center p-2 px-4 text-color4 bg-neutral-700 rounded-[.8rem] text-[1.1rem] group"
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
