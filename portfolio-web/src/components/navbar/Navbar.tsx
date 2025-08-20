import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import MenuTest from "./MenuTest";
import { useMenu } from "@/components/context/MenuContext";
//import ToggleIcon from "@/components/common/toggle-icon/ToggleIcon";
import MenuItems from "./MenuItems";
//import SocialLinks from "./SocialLinks";
import HamburgerToX from "../common/animation/morphism/HamburgerToX";
import AppointmentForm from "./AppointmentForm";
import { handleScrollItems } from "@/components/common/scroll-items/scrollItems";

const EXIT_MS = 400;

const Navbar = () => {
  const { isOpenMenu, toggleMenu } = useMenu();
  const { scrollY } = useScroll();
  const [showMenuItems, setShowMenuItems] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowMenuItems(latest > 300);
  });

  const handleNavigate = (id: string) => {
    if (isOpenMenu) toggleMenu();

    setTimeout(() => handleScrollItems(id), EXIT_MS);
  };

  return (
    <>
      {/*<div className="fixed bottom-2 right-2 z-[9999] text-2xl px-2 py-1 rounded bg-black/60 text-green-700">
        <span className="block sm:hidden">base (&lt;640)</span>
        <span className="hidden sm:block md:hidden">sm (≥640)</span>
        <span className="hidden md:block lg:hidden">md (≥768)</span>
        <span className="hidden lg:block xl:hidden">lg (≥1024)</span>
        <span className="hidden xl:block 2xl:hidden">xl (≥1280)</span>
        <span className="hidden 2xl:block">2xl (≥1536)</span>
      </div>*/}
      <nav
        id="home"
        className="flex mx-auto justify-between items-center w-full text-white mt-8 max-w-[94%] relative"
      >
        <div className="flex-1">
          <a href="/" className="flex items-center">
            <img
              src="/images/logo/cubi_logo_orange.png"
              alt="Yampe.dev"
              className="w-12 h-12"
            />
            <h1 className="text-3xl font-bold text-white mx-2">Yampe.dev</h1>
          </a>
        </div>

        <div>
          <MenuItems className="hidden mx-auto min-[1024px]:block lg:flex" />
        </div>

        <div className="hidden min-[961px]:block">
          <AnimatePresence>
            {showMenuItems && (
              <motion.div
                key="menu-items"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full flex justify-center z-[20] will-change-transform"
              >
                <div className="mt-2 rounded-xl px-4 py-2 bg-black/60 backdrop-blur-md">
                  <MenuItems />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/*{!isOpenMenu ? (
        <SocialLinks className="hidden min-[640px]:block" />
      ) : null}*/}

        <div className="flex-1 flex justify-end z-[20]">
          <HamburgerToX isOpen={isOpenMenu} toggleMenu={toggleMenu} />
        </div>

        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              initial={{ height: 0, opacity: 1, y: -10 }}
              animate={{ height: "100vh", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 1, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 w-screen h-screen backdrop-blur-md bg-black/65 z-[10] overflow-hidden pointer-events-auto"
              style={{ pointerEvents: isOpenMenu ? "auto" : "none" }}
            >
              <MenuTest onNavigate={handleNavigate} />
              <AppointmentForm className="block absolute top-[6rem] left-[1.7rem] w-full mt-0 ml-0 large:relative large:mt-[0rem] large:ml-[1rem] min-[1024px]:hidden " />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
