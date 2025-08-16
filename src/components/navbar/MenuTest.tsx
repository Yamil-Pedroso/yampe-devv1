import menuItems from "@/types/Types";
import LocationInfo from "@/components/location-info/LocationInfo";

const Menu = () => {
  return (
    <div className="flex justify-between">
      <div className="items-center h-full p-6 mt-2.5 block min-[960px]:hidden">
        <img
          src="/images/logo/cubi_logo.png"
          alt="Yampe.dev"
          className="w-12 h-12 inline-block align-middle"
        />
        <h1 className="text-3xl font-bold text-white mx-2 inline-block align-middle">
          Yampe.dev
        </h1>
      </div>
      <nav className="flex justify-between mt-30 px-10 flex-col-reverse large:flex-row large:w-full">
        <div className="flex flex-col max-w-[220px] large:max-w-[900px] text-right large:text-left ml-auto large:ml-0 mt-6 large:mt-0">
          <LocationInfo
            className="mb-4 text-white text-[1.1875rem] large:text-8xl"
            highlightClass="text-color0"
            clockClass=" flex flex-col large:mt-14 text-[2.5rem] large:text-7xl text-white"
            greetingClass="font-extralight text-[1.5rem] large:text-4xl"
          />
        </div>
        <ul className="flex flex-col text-right text-base/8">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <a
                href={item.href}
                className="text-white hover:text-color0 transition-[font-size] duration-500 ease-in-out text-[3rem] large:text-8xl "
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
