import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import RoundedBtn from "@/components/common/rounded-btn/RoundedBtn";

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
    <RoundedBtn onClick={toggleMenu} className={className}>
      {isOpen ? <IoMdClose size={31} /> : <HiOutlineMenuAlt4 size={31} />}
    </RoundedBtn>
  );
};

export default ToggleIcon;
