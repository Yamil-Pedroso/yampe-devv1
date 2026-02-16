import { createContext, useContext, useState, useEffect, useRef, useMemo } from "react";

const MenuContext = createContext<{
  isOpenMenu: boolean;
  toggleMenu: () => void;
  withMargin: boolean;
}>({
  isOpenMenu: false,
  toggleMenu: () => { },
  withMargin: false,
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const scrollYRef = useRef(0);

  const toggleMenu = () => setIsOpenMenu((prev) => !prev);

  useEffect(() => {
    const { body, documentElement } = document;

    if (isOpenMenu) {
      scrollYRef.current = window.scrollY;

      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      body.style.overflow = "hidden";
      documentElement.style.overscrollBehavior = "none";
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      const y = scrollYRef.current;
      const { body, documentElement } = document;

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
      documentElement.style.overscrollBehavior = "";

      window.scrollTo(0, y);
    }
  }, [isOpenMenu]);

  const value = useMemo(
    () => ({ isOpenMenu, toggleMenu, withMargin: false }),
    [isOpenMenu]
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => useContext(MenuContext);
