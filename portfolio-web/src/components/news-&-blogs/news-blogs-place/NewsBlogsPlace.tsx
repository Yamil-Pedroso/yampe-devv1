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
    <div className="flex flex-col items-center justify-center p-4 sm:p-8">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center">
        Latest News & Blogs
      </h2>
      <p className="text-base sm:text-lg text-color3 text-center">
        Stay updated with the latest news and blogs from our team.
      </p>

      <div className="flex flex-col justify-center lg:flex-row mt-8 sm:mt-10 lg:mt-20 gap-8 lg:gap-12 w-full">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full lg:w-auto">
          <div className="flex flex-col items-center w-full md:w-auto">
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
                  className="flex flex-col w-full sm:w-[28rem] xl:w-[24.6875rem] xl:min-h-[32.9375rem] bg-bg1-color p-[.7rem] border border-border-color cursor-pointer mb-6 sm:mb-8"
                  onClick={() => handleNewsAndBlogsClick(Number(item.id))}
                >
                  <div className="w-full sm:w-[23.3125rem] h-[16.5625rem] overflow-hidden rounded-3xl mx-auto">
                    <img
                      src={item.img ?? placeholderImg}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
                      {item.tags.map((tag, tagIndex) => (
                        <a
                          href="#"
                          key={tagIndex}
                          onClick={handleClickTag(tag)}
                          className="flex justify-center items-center px-3 h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[.95rem] sm:text-[1.1rem] group"
                        >
                          <span className="group-hover:text-color0">{tag}</span>
                        </a>
                      ))}
                    </div>

                    <h3 className="mt-5 text-color4 text-[1.1rem] sm:text-[1.25rem]">
                      {item.title}
                    </h3>

                    <hr className="my-5 border-t border-border-color" />

                    <div className="mt-auto pt-2 pb-1 flex items-center text-color2 text-[.95rem] sm:text-[1rem]">
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
          <div className="flex flex-col items-center w-full md:w-auto">
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
                  className="flex flex-col w-full sm:w-[28rem] xl:w-[24.6875rem] xl:min-h-[32.9375rem] bg-bg1-color p-[.7rem] border border-border-color cursor-pointer mb-6 sm:mb-8"
                  onClick={() => handleNewsAndBlogsClick(Number(item.id))}
                >
                  <div className="w-full sm:w-[23.3125rem] h-[16.5625rem] overflow-hidden rounded-3xl mx-auto">
                    <img
                      src={item.img ?? placeholderImg}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
                      {item.tags.map((tag, tagIndex) => (
                        <a
                          href="#"
                          key={tagIndex}
                          onClick={handleClickTag(tag)}
                          className="flex justify-center items-center px-3 h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[.95rem] sm:text-[1.1rem] group"
                        >
                          <span className="group-hover:text-color0">{tag}</span>
                        </a>
                      ))}
                    </div>

                    <h3 className="mt-5 text-color4 text-[1.1rem] sm:text-[1.25rem]">
                      {item.title}
                    </h3>

                    <hr className="my-5 border-t border-border-color" />

                    <div className="mt-auto pt-2 pb-1 flex items-center text-color2 text-[.95rem] sm:text-[1rem]">
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

        <div className="w-full lg:w-auto lg:min-w-[28rem]">
          <NewsBlogsAside keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>

      <Button
        className="mt-10 sm:mt-16 px-6 sm:px-8 font-bold"
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
