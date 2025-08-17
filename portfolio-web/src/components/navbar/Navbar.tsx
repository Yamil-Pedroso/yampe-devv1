import { motion, AnimatePresence } from "framer-motion";
import MenuTest from "./MenuTest";
import { useMenu } from "@/components/context/MenuContext";
import ToggleIcon from "@/components/common/toggle-icon/ToggleIcon";
import SocialLinks from "./SocialLinks";
import MenuItems from "./MenuItems";

const Navbar = () => {
  //const [isMobile, setIsMobile] = useState(false);

  const { isOpenMenu, toggleMenu } = useMenu();

  //useEffect(() => {
  //  const handleResize = () => {
  //    setIsMobile(window.innerWidth < 960);
  //  };
  //
  //  handleResize();
  //
  //  window.addEventListener("resize", handleResize);
  //
  //  return () => window.removeEventListener("resize", handleResize);
  //}, []);

  return (
    <nav
      className="flex mx-auto justify-between items-center w-full text-white mt-8 max-w-[94%]
    "
    >
      <a href="/" className="flex items-center">
        <img
          src="/images/logo/cubi_logo.png"
          alt="Yampe.dev"
          className="w-12 h-12"
        />
        <h1 className="text-3xl font-bold text-white mx-2">Yampe.dev</h1>
      </a>

      {/*<div className="hidden min-[961px]:block">
        <MenuItems />
      </div> */}

      {/*{!isOpenMenu ? (
        <SocialLinks className="hidden min-[640px]:block" />
      ) : null}*/}

      {/*<div className="block min-[961px]:hidden">
        <LuAlignJustify
          size={23}
          className="cursor-pointer"
          onClick={handleClick}
        />*/}
      {/*<div>
        <AnimatePresence>
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex justify-center  w-[12rem] p-4 bg-[var(--element-bg1-color)]"
          >
            <MenuItems />
          </motion.div>
        </AnimatePresence>
      </div>*/}

      {/*<div className="flex justify-center items-center w-[3.125rem] h-[3.125rem] rounded-full bg-[var(--element-bg-color)] overflow-hidden cursor-pointer">
        <LuAlignRight size={23} className="text-[#202020]" />
      </div> */}
      <div className="z-[999]">
        <ToggleIcon
          className={`w-[3.125rem] h-[3.125rem]`}
          isOpen={isOpenMenu}
          toggleMenu={toggleMenu}
        />
      </div>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full backdrop-blur-md bg-black/65 z-10 overflow-hidden pointer-events-auto"
            style={{
              pointerEvents: isOpenMenu ? "auto" : "none",
            }}
          >
            <MenuTest />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
