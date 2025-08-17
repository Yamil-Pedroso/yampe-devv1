interface RoundedBtnProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
}

const RoundedBtn = ({
  children,
  width,
  height,
  onClick,
  className,
}: RoundedBtnProps) => {
  return (
    <div
      className={`flex justify-center items-center text-bg1-color ${width} ${height} rounded-full bg-color0 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default RoundedBtn;
