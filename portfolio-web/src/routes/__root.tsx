import { Outlet, createRootRoute } from "@tanstack/react-router";
import MainLayout from "@/layouts/MainLayout";
//import Loader from "@/components/common/loader/Loader";
//import RetroLoader from "@/components/common/loader/RetroLoader";
import { MenuProvider } from "@/components/context/MenuContext";
import ScrollToTopPages from "@/components/common/scroll-items/ScrollToTopPages";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <MenuProvider>
      <MainLayout>
        <ScrollToTopPages />
        <Outlet />
      </MainLayout>
    </MenuProvider>
  );
}
