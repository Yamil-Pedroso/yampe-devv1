/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import MenuTest from "./MenuTest";
import { useMenu } from "@/components/context/MenuContext";
import MenuItems from "./MenuItems";
import HamburgerToX from "../common/animation/morphism/HamburgerToX";
import AppointmentForm from "./AppointmentForm";
import { handleScrollItems } from "@/components/common/scroll-items/scrollItems";
import LogoComp from "@/components/common/logo/LogoComp";

import { IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import { fetchNotifications } from "../services/notificationsService";
import { useAdminAuth } from "@/lib/hooks/useAdminAuth";
import { Link } from "@tanstack/react-router";
import PlatformItem from "../common/platforms/PlatformItem";

const letters = ["Y", "a", "m", "p", "e", ".", "d", "e", "v"];

const EXIT_MS = 400;

const Navbar = () => {
  const { isOpenMenu, toggleMenu } = useMenu();
  const { scrollY } = useScroll();

  const [showMenuItems, setShowMenuItems] = useState(false);

  const bellRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const [containNotification, setContainNotification] = useState(false);

  const [backendNotifications, setBackendNotifications] = useState<
    { id: string; message: string; createdAt: string }[]
  >([]);

  // Load how many the user has already "seen"
  const [previousNotifications, setPreviousNotifications] = useState(() => {
    const saved = localStorage.getItem("previousNotificationsCount");
    return saved ? Number(saved) : 0;
  });

  // Whether the green dot should show
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const { authorized } = useAdminAuth();

  /**
   * Toggle dropdown — when user opens it,
   * notifications are marked as READ
   */
  const toggleNotifications = () => {
    setContainNotification((prev) => {
      const isOpening = !prev;

      if (isOpening) {
        // User saw notifications → mark as read
        setHasNewNotifications(false);

        localStorage.setItem(
          "previousNotificationsCount",
          backendNotifications.length.toString(),
        );

        setPreviousNotifications(backendNotifications.length);
      }

      return isOpening;
    });
  };

  /**
   * Fetch notifications from backend once
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotifications();

        setBackendNotifications(
          data.map((n: any) => ({
            id: n._id,
            message: n.message,
            createdAt: n.createdAt,
          })),
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);

  /**
   * Detect NEW notifications:
   * If backend length is greater than last seen count → NEW notification exists
   */
  useEffect(() => {
    if (backendNotifications.length === 0) return;

    if (backendNotifications.length > previousNotifications) {
      setHasNewNotifications(true); // NEW notification exists
    }
  }, [backendNotifications, previousNotifications]);

  /**
   * Close dropdown if click outside
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target) &&
        bellRef.current &&
        !bellRef.current.contains(target)
      ) {
        setContainNotification(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Show floating menu on scroll
   */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowMenuItems(latest > 300);
  });

  const handleNavigate = (id: string) => {
    if (isOpenMenu) toggleMenu();
    setTimeout(() => handleScrollItems(id), EXIT_MS);
  };

  return (
    <>
      <nav
        id="home"
        className="flex mx-auto justify-between items-center w-full text-white mt-8 max-w-[94%] relative"
      >
        {/* Logo */}
        <a href="/" className="rounded-[0.3rem] border w-max">
          <motion.div
            className="flex items-end cursor-pointer group "
            whileHover="hover"
          >
            {/* Logo */}
            <motion.div
              initial={{ x: -80, scale: 1.4, opacity: 0 }}
              animate={{
                x: 0,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="flex-shrink-0"
              variants={{
                hover: {
                  y: -4,
                  rotate: -3,
                  transition: { duration: 0.25, ease: "easeOut" },
                },
              }}
            >
              <LogoComp className="w-14 h-14" width={48} height={48} />
            </motion.div>

            {/* Animated letters */}
            <motion.h1
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              className="text-2xl font-bold text-white mx-3 flex"
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  className={char === "." ? "text-purple-300" : ""}
                  variants={{
                    hover: {
                      y: -3,
                      rotate: (Math.random() - 0.5) * 10, // pequeño tilt aleatorio
                      transition: {
                        duration: 0.25,
                        ease: "easeOut",
                        delay: i * 0.03, // wave effect
                      },
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        </a>
        {/* Desktop Menu */}
        <div className="flex-1 flex justify-center items-center">
          <MenuItems className="hidden mx-auto min-[1024px]:block lg:flex" />
        </div>

        {/* Floating Menu on Scroll */}
        <div className="hidden min-[961px]:block">
          <AnimatePresence>
            {showMenuItems && (
              <motion.div
                key="menu-items"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full flex justify-center z-[20]"
              >
                <div className="mt-2 rounded-xl px-4 py-2 bg-black/60 backdrop-blur-md">
                  <MenuItems />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {authorized && (
          <Link
            to="/admin/notifications"
            className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm transition absolute left-1/2 -translate-x-1/2 top-[3.5rem]"
          >
            Admin Panel
          </Link>
        )}

        {/* Notifications + Hamburger */}
        <div className="flex-1 flex justify-end items-center">
          {/* Platforms */}

          <PlatformItem />
          <AnimatePresence>
            <div
              ref={bellRef}
              className="flex items-center cursor-pointer mr-4 relative"
            >
              {backendNotifications.length > 0 ? (
                <>
                  <IoIosNotifications
                    className="text-3xl text-gray-300"
                    title="Notifications"
                    onClick={toggleNotifications}
                  />

                  {/* Green dot / gray dot */}
                  <div
                    className={`
                      absolute top-0 right-[2px] w-3 h-3 rounded-full
                      ${hasNewNotifications ? "bg-green-400" : "bg-gray-500"}
                    `}
                  />

                  {/* Notification Dropdown */}
                  <AnimatePresence>
                    {containNotification && (
                      <motion.div
                        ref={notificationRef}
                        key="notif-dropdown"
                        initial={{ opacity: 0, scale: 0.85, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="
        absolute z-20
        bg-black/60 backdrop-blur-xl
        shadow-2xl rounded-xl p-4
        left-[-6rem] -translate-x-1/2 top-10
        w-[60vw] max-w-sm
        md:left-auto md:right-0 md:translate-x-0 md:top-10 md:w-80
        border border-white/10
      "
                      >
                        <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                          <IoIosNotifications className="text-gray-400 text-2xl" />
                          Notifications
                        </h3>

                        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                          {backendNotifications.map((n) => {
                            const formattedDate = new Date(
                              n.createdAt,
                            ).toLocaleString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "short",
                            });

                            return (
                              <div
                                key={n.id}
                                className="
                bg-white/10 p-3 rounded-lg border border-white/10
                hover:bg-white/20 transition-all duration-200
                flex justify-between items-start gap-3
              "
                              >
                                <div className="flex-1">
                                  <p className="text-white text-sm leading-tight">
                                    {n.message}
                                  </p>
                                </div>

                                <div className="text-right text-xs text-gray-300 whitespace-nowrap">
                                  {formattedDate}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {backendNotifications.length === 0 && (
                          <p className="text-gray-300 text-sm text-center py-3">
                            No notifications yet
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <IoIosNotificationsOff
                  className="text-3xl text-gray-500"
                  title="No notifications"
                />
              )}
            </div>

            {/* Hamburger */}
            <div className="z-[20]">
              <HamburgerToX isOpen={isOpenMenu} toggleMenu={toggleMenu} />
            </div>
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              initial={{ height: 0, opacity: 1, y: -10 }}
              animate={{ height: "100dvh", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 1, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 w-screen h-screen backdrop-blur-md bg-black/65 z-[10] overflow-y-auto pointer-events-auto"
            >
              <MenuTest onNavigate={handleNavigate} />
              <AppointmentForm className="block absolute top-[6rem] left-[1.7rem] w-full min-[1024px]:hidden" />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
