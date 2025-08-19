import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import MenuTest from "./MenuTest";
import { useMenu } from "@/components/context/MenuContext";
import ToggleIcon from "@/components/common/toggle-icon/ToggleIcon";
import MenuItems from "./MenuItems";
import SocialLinks from "./SocialLinks";
import HamburgerToX from "../common/animation/morphism/HamburgerToX";

const Navbar = () => {
  const { isOpenMenu, toggleMenu } = useMenu();
  const { scrollY } = useScroll();
  const [showMenuItems, setShowMenuItems] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowMenuItems(latest > 300);
  });

  return (
    <nav
      id="home"
      className="flex mx-auto justify-between items-center w-full text-white mt-8 max-w-[94%] relative"
    >
      <a href="/" className="flex items-center">
        <img
          src="/images/logo/cubi_logo_orange.png"
          alt="Yampe.dev"
          className="w-12 h-12"
        />
        <h1 className="text-3xl font-bold text-white mx-2">Yampe.dev</h1>
      </a>

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

      {!isOpenMenu ? (
        <SocialLinks className="hidden min-[640px]:block" />
      ) : null}

      <div className="z-[20]">
        {/*<ToggleIcon
          className="w-[3.125rem] h-[3.125rem]"
          isOpen={isOpenMenu}
          toggleMenu={toggleMenu}
          />*/}
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
            <MenuTest />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
