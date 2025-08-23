import menuItems from "@/types/Types";

interface MenuProps {
  onNavigate?: (id: string) => void;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ onNavigate, className }) => {
  return (
    <ul
      className={`flex-col text-right text-base/8 block
        min-[1024px]:hidden ${className}`}
    >
      {menuItems.map((item, i) => (
        <li key={i} className="mb-4">
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.(item.id);
            }}
            className="text-white hover:text-color0 transition-[font-size] duration-500 ease-in-out text-[2.4rem] custom-small:text-[3rem] lg:text-8xl "
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
