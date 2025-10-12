import { useNavigate } from "@tanstack/react-router";
import DarkContainer from "../common/containers/DarkContainer";
import { Route as NewsBlogsRoute } from "@/routes/new-work-details/$newsBlogsId";
//import { newsAndBlogsData } from "@/data/newsAndBlogsData";
import { useDevtoByTags } from "@/lib/hooks/useDevto";
import ElementContainer from "../common/element-container/ElementContainer";
import Button from "../common/buttons/Button";
import { IoIosArrowForward } from "react-icons/io";
import { motion, Variants } from "framer-motion";
import {
  ctaEnter,
  ctaHover,
  ctaTap,
} from "@/components/common/animation/motionTokens";

const placeholderImg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%%' height='100%%' fill='%23f3f4f6'/><text x='50%%' y='50%%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='system-ui' font-size='20'>Sin imagen</text></svg>";

const NewsAndBlogs = () => {
  const navigate = useNavigate();
  const header = "News & Blogs";
  //const { newsAndBlogs } = newsAndBlogsData;
  const { data: newsAndBlogs = [] } = useDevtoByTags(
    ["react", "typescript", "javascript"],
    6
  );

  const handleNewsAndBlogsClick = (newsBlogsId: number) => {
    navigate({
      to: NewsBlogsRoute.to,
      params: { newsBlogsId: String(newsBlogsId) },
    });
  };

  // Animaciones: suaves, desde abajo, con escalonado corto
  const listStagger: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const cardUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  const innerStagger: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
  };

  const innerItem: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const dt = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Zurich",
  });

  return (
    <DarkContainer className="flex flex-col justify-center mt-30">
      <motion.div
        id="blogs"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-color4 font-bold">{header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14">
          Latest News <span className="text-color0">Blogs</span>
        </p>
      </motion.div>

      {/* Contenedor con stagger para las tarjetas */}
      <motion.div
        variants={listStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col justify-center items-center w-full lg:flex-row gap-8"
      >
        {newsAndBlogs.slice(0, 2).map((item, i) => (
          <motion.div key={i} variants={cardUp}>
            <ElementContainer
              className="flex justify-center items-center mb-4 w-full xs:w-[28rem] xl:w-[39.375rem] xl:h-[22rem] bg-bg1-color p-[.7rem] gap-10 cursor-pointer"
              onClick={() => handleNewsAndBlogsClick(Number(item.id))}
            >
              <motion.div
                variants={innerStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col lg:flex-col xl:flex-row w-full h-full gap-10"
              >
                <motion.div
                  variants={innerItem}
                  className="w-full h-[30rem] lg:h-[30.5rem] xl:w-[18.125rem] xl:h-[20.625rem] rounded-2xl overflow-hidden"
                >
                  <img
                    src={item.image ?? placeholderImg}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-95"
                  />
                </motion.div>

                <motion.div
                  variants={innerStagger}
                  className="flex flex-col flex-1 gap-12 p-5"
                >
                  <motion.div variants={innerItem} className="flex gap-2 mt-2">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <a
                        href="#"
                        key={tagIndex}
                        className="flex justify-center items-center w-[7rem] h-[2.25rem] text-color4 bg-neutral-700 rounded-[.8rem] text-[1.1rem] group"
                      >
                        <span className="group-hover:text-color0">{tag}</span>
                      </a>
                    ))}
                  </motion.div>

                  <motion.h3
                    variants={innerItem}
                    className="text-color4 text-[22px]"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.div variants={innerItem} className="flex">
                    <div className="flex items-center gap-2">
                      {/*{item.icon && <item.icon className="text-gray-400" />}*/}
                    </div>
                    <p className=" text-gray-500 ml-3">
                      {item.publishedAt
                        ? dt.format(new Date(item.publishedAt))
                        : "—"}{" "}
                      - {item.author}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </ElementContainer>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        className="flex justify-center"
      >
        <Button
          href="/news-blogs"
          initial="hidden"
          animate="show"
          variants={ctaEnter}
          transition={{ delay: 0.35 }}
          whileHover={ctaHover}
          whileTap={ctaTap}
          className="cursor-pointer group"
        >
          <span className="font-bold ">Explore News & Blogs</span>
          <span>
            <IoIosArrowForward
              className="group-hover:ml-2 transition-all duration-300"
              size={20}
            />
          </span>
        </Button>
      </motion.div>
    </DarkContainer>
  );
};

export default NewsAndBlogs;
