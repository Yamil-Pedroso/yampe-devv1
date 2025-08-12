import { createContext, useContext, useState } from "react";

const MenuContext = createContext<{
  isOpenMenu: boolean;
  toggleMenu: () => void;
}>({
  isOpenMenu: false,
  toggleMenu: () => {},
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => setIsOpenMenu((prev) => !prev);

  return (
    <MenuContext.Provider value={{ isOpenMenu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
