import LocationInfo from "@/components/location-info/LocationInfo";
import AppointmentForm from "./AppointmentForm";
import Menu from "./Menu";

interface MenuProps {
  onNavigate?: (id: string) => void;
}

const MenuTest: React.FC<MenuProps> = ({ onNavigate }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center h-full p-6 mt-2.5 min-[960px]:hidden">
        <img
          src="/images/logo/cubi_logo_orange.png"
          alt="Yampe.dev"
          className="w-12 h-12 inline-block align-middle"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mx-2 inline-block align-middle">
          Yampe.dev
        </h1>
      </div>
      <nav className="flex justify-between mt-30 px-10 flex-col-reverse large:flex-row large:w-full">
        <div className="flex justify-between w-full absolute left-[1.6rem] top-[36rem] custom-small:relative custom-small:left-0 custom-small:top-0 large:top-0 large:left-0 large:items-center large:gap-10">
          <div className=" w-full flex flex-col max-w-[220px]  large:max-w-[900px] custom-small:text-right large:text-left  large:ml-0 mt-6 large:mt-0">
            <LocationInfo
              className="mb-4 text-white text-[1.1875rem] large:text-8xl"
              highlightClass="text-color0"
              clockClass=" flex flex-col large:mt-14 text-[2.5rem] large:text-7xl text-white"
              greetingClass="font-extralight text-[1.5rem] large:text-4xl"
            />
          </div>
          <div className="flex flex-col">
            <AppointmentForm className="hidden min-[1024px]:block" />
          </div>
        </div>

        <Menu onNavigate={onNavigate} />
      </nav>
    </div>
  );
};

export default MenuTest;
