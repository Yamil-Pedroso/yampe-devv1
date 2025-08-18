import menuItems from "../../types/Types";

const NAV_OFFSET = 80;

const MenuItems = () => {
  const handleScrollItems = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <ul className="flex flex-col min-[961px]:flex-row space-y-2 min-[961px]:space-y-0 min-[961px]:space-x-4 text-white">
      {menuItems.map((item, i) => (
        <li key={i} className="hover:text-color0 hover:underline duration-300">
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              handleScrollItems(item.id);
            }}
            className="cursor-pointer"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
