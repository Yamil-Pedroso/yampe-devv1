import menuItems from "../../types/Types";

const MenuItems = () => {
  return (
    <ul className="flex flex-col min-[961px]:flex-row space-y-2 min-[961px]:space-y-0 min-[961px]:space-x-4 text-white">
      {menuItems.map((item, i) => (
        <li key={i}>
          <a href={item.href}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
