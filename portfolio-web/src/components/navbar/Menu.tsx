import React, { useState } from "react";
import { menuItems } from "@/types/Types";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { handleScrollItems } from "@/components/common/scroll-items/scrollItems";
import { useMenu } from "@/components/context/MenuContext";

interface MenuProps {
  onNavigate?: (id: string) => void;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { toggleMenu } = useMenu();

  const handleOpen = (key: string) => setOpenItem(key);
  const handleClose = () => setOpenItem(null);

  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    setOpenItem(null);
    toggleMenu();
    if (location.pathname === "/") {
      setTimeout(() => handleScrollItems(id), 400);
    } else {
      navigate({ to: "/", hash: id });
    }
  };

  return (
    <ul
      className={`flex-col text-right text-base/8 block min-[1024px]:hidden ${className}`}
    >
      {menuItems.map((item, i) => {
        const isOpen = openItem === item.title;
        const hasSubmenus =
          Array.isArray(item.submenus) && item.submenus.length > 0;

        return (
          <li
            key={i}
            className="relative mb-4"
            onMouseEnter={() => hasSubmenus && handleOpen(item.title)}
            onMouseLeave={() => hasSubmenus && handleClose()}
          >
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.id);
              }}
              className="text-white hover:text-color0 transition-[font-size] duration-500 ease-in-out text-[2rem] mr-14 custom-small:text-[3rem] custom-small:m-0 lg:text-8xl"
            >
              {item.title}
            </a>

            <AnimatePresence>
              {isOpen && hasSubmenus && (
                <motion.ul
                  key="dropdown"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="
    absolute top-full mt-3 z-30
    left-1/2 -translate-x-1/2
    sm:left-[45%] sm:-translate-x-1/2
    max-[640px]:left-[20%] max-[640px]:-translate-x-1/2

    w-52 sm:w-44 max-[480px]:w-40
    rounded-2xl backdrop-blur-md border border-white/50
    bg-white/70 dark:bg-neutral-900/80 text-black dark:text-white
    shadow-[0_8px_25px_rgba(0,0,0,0.15)]
    overflow-hidden
  "
                >
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-color0 to-transparent opacity-40" />

                  {item.submenus!.map((submenu, j) => (
                    <motion.li key={j}>
                      <a
                        href={item.href}
                        className="
          block px-5 py-2.5 text-sm font-medium
          hover:bg-color0/10 dark:hover:bg-color0/20
          transition-all duration-200 ease-in-out w-full
          rounded-md
        "
                      >
                        {submenu}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
