/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import InfoFooter from "@/components/footer/InfoFooter";
import Lenis from "@studio-freight/lenis";
import ModalNote from "@/components/common/modals/ModalNote";
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  };

  useEffect(() => {
    const modalAlreadyShown = getLocalStorage("modalShown");

    if (!modalAlreadyShown) {
      setIsModalOpen(true);
      setLocalStorage("modalShown", true);
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const onScroll = () => {
      document.dispatchEvent(new Event("scroll"));
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col mx-auto min-h-screen">
      {isModalOpen && <ModalNote onClose={closeModal} />}
      <Navbar />
      <main className="flex-grow">{children}</main>
      <InfoFooter />
    </div>
  );
};

export default MainLayout;
