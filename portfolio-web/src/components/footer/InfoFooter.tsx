import { useState } from "react";
import DarkContainer from "../common/containers/DarkContainer";
import { infoFooterData } from "@/data/infoFooterData";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import Footer from "./Footer";
import { MdOutlineEmail } from "react-icons/md";
import Button from "../common/buttons/Button";
import { IoIosArrowForward } from "react-icons/io";
import { motion, Variants } from "framer-motion";
import {
  ctaEnter,
  ctaHover,
  ctaTap,
} from "@/components/common/animation/motionTokens";
import ScrollToTopMorph from "../common/animation/morphism/ScrollToTopMorph";

const listStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const colUp: Variants = {
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
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const innerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const InfoFooter = () => {
  const { quickLinks, address } = infoFooterData;
  const [email, setEmail] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Email submitted:", email);
    alert(`Email submitted: ${email}`);
    setEmail("");
  };

  return (
    <div id="contact">
      <DarkContainer className="mt-16 sm:mt-20 md:mt-24 lg:mt-30 w-full min-h-[20rem] sm:min-h-[24rem] md:min-h-[26rem] lg:min-h-[28rem] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 relative">
        <motion.div
          className="w-full max-w-7xl"
          variants={listStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14"
            variants={listStagger}
          >
            {/* Col 1: Logo + brand */}
            <motion.div
              className="flex flex-col items-center sm:items-center md:items-start"
              variants={colUp}
            >
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                variants={innerStagger}
              >
                <motion.img
                  variants={innerItem}
                  src="/images/logo/cubi_logo_orange.png"
                  alt="Yampe.dev"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
                <motion.h1
                  variants={innerItem}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white mx-1 sm:mx-2"
                >
                  Yampe.dev
                </motion.h1>
              </motion.div>
            </motion.div>

            {/* Col 2: Quick Link + subscribe */}
            <motion.div
              variants={colUp}
              className="md:col-span-1 lg:col-span-1"
            >
              <motion.h4
                variants={innerItem}
                className="mb-4 sm:mb-5 text-base sm:text-lg font-semibold text-white text-center md:text-left"
              >
                Quick Link
              </motion.h4>

              <motion.nav variants={innerStagger} aria-label="Quick links">
                <ul className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
                  {quickLinks?.map((link) => (
                    <motion.li key={link.text} variants={innerItem}>
                      <a
                        href={link.href}
                        className="text-sm sm:text-base text-zinc-300 transition hover:text-white"
                      >
                        {link.text}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              <motion.form
                onSubmit={handleOnSubmit}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 items-center sm:items-start"
                variants={innerStagger}
              >
                <motion.div
                  className="relative w-full sm:flex-1"
                  variants={innerItem}
                >
                  <MdOutlineEmail
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-color0"
                    aria-hidden
                  />
                  <input
                    type="email"
                    name="subscribeEmail"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Email Address"
                    className="
                      w-full
                      bg-transparent text-zinc-300 placeholder:text-zinc-500
                      pl-10 pr-4 py-2 sm:py-2.5
                      border-0 border-b border-b-zinc-600
                      focus:border-color0 focus:outline-none focus:ring-0
                      text-sm sm:text-base
                    "
                  />
                </motion.div>

                <motion.div variants={innerItem} className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    initial="hidden"
                    animate="show"
                    variants={ctaEnter}
                    transition={{ delay: 0.35 }}
                    whileHover={ctaHover}
                    whileTap={ctaTap}
                    className="cursor-pointer group"
                  >
                    <span className="font-bold">Subscribe</span>
                    <span>
                      <IoIosArrowForward
                        className="group-hover:ml-2 transition-all duration-300"
                        size={20}
                      />
                    </span>
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Col 3: Address */}
            <motion.div
              variants={colUp}
              className="md:col-span-2 lg:col-span-1"
            >
              <motion.h4
                variants={innerItem}
                className="mb-4 sm:mb-5 text-base sm:text-lg font-semibold text-white text-center md:text-left"
              >
                Address
              </motion.h4>

              <motion.address
                className="not-italic space-y-3 sm:space-y-4 text-zinc-300"
                variants={innerStagger}
              >
                <motion.p
                  className="flex items-start justify-center md:justify-start gap-3"
                  variants={innerItem}
                >
                  <FiMapPin className="mt-0.5 sm:mt-1 shrink-0 text-color0 text-sm sm:text-base" />
                  <span className="text-sm sm:text-base md:text-lg text-center md:text-left">
                    {address?.street}
                  </span>
                </motion.p>

                <motion.p
                  className="flex items-start justify-center md:justify-start gap-3"
                  variants={innerItem}
                >
                  <FiMail className="mt-0.5 sm:mt-1 shrink-0 text-color0 text-sm sm:text-base" />
                  <a
                    href={`mailto:${address?.email}`}
                    className="transition hover:text-white text-sm sm:text-base md:text-lg"
                  >
                    {address?.email}
                  </a>
                </motion.p>

                <motion.p
                  className="flex items-start justify-center md:justify-start gap-3"
                  variants={innerItem}
                >
                  <FiPhone className="mt-0.5 sm:mt-1 shrink-0 text-color0 text-sm sm:text-base" />
                  <a
                    href={`tel:${address?.phone.replace(/[\s()-]/g, "")}`}
                    className="transition hover:text-white text-sm sm:text-base md:text-lg"
                  >
                    {address?.phone}
                  </a>
                </motion.p>
              </motion.address>
            </motion.div>
          </motion.div>
        </motion.div>
        <ScrollToTopMorph className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 z-50" />
      </DarkContainer>

      <Footer />
    </div>
  );
};

export default InfoFooter;
