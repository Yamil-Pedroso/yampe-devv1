import menuItems from "@/types/Types";
import LocationInfo from "@/components/location-info/LocationInfo";

const Menu = () => {
  return (
    <nav className="flex justify-between mt-30 px-10">
      <div className="flex flex-col max-w-[900px]">
        <LocationInfo
          className="mb-4 text-8xl text-white"
          highlightClass="text-color0"
          clockClass="flex flex-col mt-14 text-7xl text-white"
          greetingClass="font-extralight text-4xl"
        />
      </div>
      <ul className="flex flex-col text-right">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-4">
            <a
              href={item.href}
              className="text-white hover:text-color0 transition-colors text-8xl"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
