import { useState, useEffect } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import MainLayout from "@/layouts/MainLayout";
import Loader from "@/components/common/loader/Loader";
import { MenuProvider } from "@/components/context/MenuContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen overflow-hidden">
        <Loader />
      </div>
    );
  }

  return (
    <MenuProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </MenuProvider>
  );
}
