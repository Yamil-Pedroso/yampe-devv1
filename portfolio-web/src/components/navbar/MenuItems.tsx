import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

import { menuItems } from "../../types/Types";
import { handleScrollItems } from "../../components/common/scroll-items/scrollItems";

interface MenuItemProps {
  className?: string;
}

const CLOSE_DELAY = 150;

const MenuItems: React.FC<MenuItemProps> = ({ className }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const open = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenItem(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenItem(null), CLOSE_DELAY);
  };

  const handleItemClick = (id: string) => {
    if (location.pathname === "/") {
      handleScrollItems(id);
    } else {
      navigate({ to: "/", hash: id });
    }
    setOpenItem(null);
  };

  return (
    <div>
      <ul
        className={`${className} flex flex-col min-[961px]:flex-row space-y-2 min-[961px]:space-y-0 min-[961px]:space-x-4 text-white`}
      >
        {menuItems.map((item, i) => {
          const isOpen = openItem === item.title;
          const hasSubmenus =
            Array.isArray(item.submenus) && item.submenus.length > 0;

          return (
            <li
              key={i}
              className="relative hover:text-color0 duration-300"
              onMouseEnter={() => open(item.title)}
              onMouseLeave={scheduleClose}
              onFocus={() => open(item.title)}
              onBlur={scheduleClose}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.id);
                }}
                className="cursor-pointer hover:underline"
              >
                {item.title}
              </a>

              <AnimatePresence>
                {isOpen && hasSubmenus && (
                  <motion.ul
                    key="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 w-44 rounded-md shadow-md bg-white text-black p-2"
                    onMouseEnter={() => open(item.title)}
                    onMouseLeave={scheduleClose}
                    role="menu"
                    aria-label={`${item.title} submenu`}
                  >
                    {/* “Puente” anti-gap (invisible) */}
                    <div className="absolute -top-2 left-0 right-0 h-2 pointer-events-none" />

                    {item.submenus!.map((submenu, idx) => (
                      <li key={idx} role="menuitem">
                        <a href={item.href}>
                          <button className="w-full text-left px-2 py-1 rounded hover:bg-black/5">
                            {submenu}
                          </button>
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuItems;
