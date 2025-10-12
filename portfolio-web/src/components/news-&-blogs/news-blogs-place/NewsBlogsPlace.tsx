import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route as NewsBlogsRoute } from "@/routes/new-work-details/$newsBlogsId";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Button from "@/components/common/buttons/Button";
import { motion, type Variants } from "framer-motion";
import NewsBlogsAside from "@/components/news-&-blogs/news-blogs-aside/NewsBlogsAside";
import { useDevtoByTags } from "@/lib/hooks/useDevto";

const placeholderImg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%%' height='100%%' fill='%23f3f4f6'/><text x='50%%' y='50%%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='system-ui' font-size='20'>Sin imagen</text></svg>";

const TAGS = ["react", "typescript", "javascript"];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeInOut" },
  },
};

const NewsBlogsPlace = () => {
  const navigate = useNavigate();
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

  const handleNewsAndBlogsClick = (newsBlogsId: number) => {
    navigate({
      to: NewsBlogsRoute.to,
      params: { newsBlogsId: String(newsBlogsId) },
    });
  };

  const [keyword, setKeyword] = useState("");
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((it) => {
      const inTitle = it.title.toLowerCase().includes(q);
      const inTags = it.tags.some((t) => t.toLowerCase().includes(q));
      return inTitle || inTags;
    });
  }, [allItems, keyword]);

  const [visibleCount, setVisibleCount] = useState(8);
  const visibleItems = filtered.slice(0, visibleCount);

  const { col1, col2 } = useMemo(() => {
    const left: typeof visibleItems = [];
    const right: typeof visibleItems = [];
    for (let i = 0; i < visibleItems.length; i++) {
      const posInBlock = i % 8;
      if (posInBlock <= 3) left.push(visibleItems[i]);
      else right.push(visibleItems[i]);
    }
    return { col1: left, col2: right };
  }, [visibleItems]);

  const handleViewMore = () => {
    setVisibleCount((c) => Math.min(c + 4, filtered.length));
  };

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
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-6xl">Latest News & Blogs</h2>
      <p className="text-lg text-color3">
        Stay updated with the latest news and blogs from our team.
      </p>

      <div className="flex mt-10 gap-12 sm:mt-14 lg:mt-20">
        <div className="flex gap-8">
          {/* Columna 1 */}
          <div className="grid justify-items-center">
            {col1.map((item, i) => (
              <motion.div
                key={`c1-${item.id}-${i}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 4) * 0.06 }}
                className="w-full flex justify-center"
              >
                <ElementContainer
                  className="flex flex-col w-full xs:w-[28rem] xl:w-[24.6875rem] xl:min-h-[32.9375rem] bg-bg1-color p-[.7rem] border border-border-color cursor-pointer mb-8"
                  onClick={() => handleNewsAndBlogsClick(Number(item.id))}
                >
                  {/* Imagen fija */}
                  <div className="w-[23.3125rem] h-[16.5625rem] overflow-hidden rounded-3xl">
                    <img
                      src={item.img ?? placeholderImg}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>

                  {/* Contenido que se estira */}
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap gap-3 mt-5">
                      {item.tags.map((tag, tagIndex) => (
                        <a
                          href="#"
                          key={tagIndex}
                          onClick={handleClickTag(tag)}
                          className="flex justify-center items-center w-[7rem] h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[1.1rem] group"
                        >
                          <span className="group-hover:text-color0">{tag}</span>
                        </a>
                      ))}
                    </div>

                    <h3 className="mt-5 text-color4 text-[1.25rem]">
                      {item.title}
                    </h3>

                    <hr className="my-5 border-t border-border-color" />

                    {/* Fecha pegada al fondo con margen inferior consistente */}
                    <div className="mt-auto pt-2 pb-1 flex items-center text-color2 text-[1rem]">
                      <FaCalendarAlt className="inline mr-1" />
                      <span className="ml-2">
                        {item.createdAt
                          ? dt.format(new Date(item.createdAt))
                          : "—"}
                      </span>
                    </div>
                  </div>
                </ElementContainer>
              </motion.div>
            ))}
          </div>

          {/* Columna 2 */}
          <div className="">
            {col2.map((item, i) => (
              <motion.div
                key={`c2-${item.id}-${i}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 4) * 0.06 }}
                className="w-full flex justify-center"
              >
                <ElementContainer
                  className="flex flex-col w-full xs:w-[28rem] xl:w-[24.6875rem] xl:min-h-[32.9375rem] bg-bg1-color p-[.7rem] border border-border-color cursor-pointer mb-8"
                  onClick={() => handleNewsAndBlogsClick(Number(item.id))}
                >
                  <div className="w-[23.3125rem] h-[16.5625rem] overflow-hidden rounded-3xl">
                    <img
                      src={item.img ?? placeholderImg}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap gap-3 mt-5">
                      {item.tags.map((tag, tagIndex) => (
                        <a
                          href="#"
                          key={tagIndex}
                          onClick={handleClickTag(tag)}
                          className="flex justify-center items-center w-[7rem] h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[1.1rem] group"
                        >
                          <span className="group-hover:text-color0">{tag}</span>
                        </a>
                      ))}
                    </div>

                    <h3 className="mt-5 text-color4 text-[1.25rem]">
                      {item.title}
                    </h3>

                    <hr className="my-5 border-t border-border-color" />

                    <div className="mt-auto pt-2 pb-1 flex items-center text-color2 text-[1rem]">
                      <FaCalendarAlt className="inline mr-1" />
                      <span className="ml-2">
                        {item.createdAt
                          ? dt.format(new Date(item.createdAt))
                          : "—"}
                      </span>
                    </div>
                  </div>
                </ElementContainer>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Third column (sidebar) */}
        <NewsBlogsAside keyword={keyword} setKeyword={setKeyword} />
      </div>

      <Button
        className="mt-16 px-8 font-bold"
        onClick={handleViewMore}
        disabled={visibleCount >= filtered.length}
      >
        View More Articles
        <IoIosArrowForward className="inline ml-2" />
      </Button>
    </div>
  );
};

export default NewsBlogsPlace;
