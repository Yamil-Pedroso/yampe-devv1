import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

interface ToggleIconProps {
  isOpen?: boolean;
  toggleMenu?: () => void;
  className?: string;
}

const ToggleIcon: React.FC<ToggleIconProps> = ({
  isOpen,
  toggleMenu,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <button onClick={toggleMenu} className="text-color0">
        {isOpen ? <IoMdClose size={48} /> : <HiOutlineMenuAlt4 size={48} />}
      </button>
    </div>
  );
};

export default ToggleIcon;
