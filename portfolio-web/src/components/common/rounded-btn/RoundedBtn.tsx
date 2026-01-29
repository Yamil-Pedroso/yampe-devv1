interface RoundedBtnProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const RoundedBtn = ({
  children,
  width,
  height,
  onClick,
  className,
  style,
}: RoundedBtnProps) => {
  return (
    <div
      className={`
        flex justify-center items-center
        text-white
        ${width} ${height}
        rounded-full
        bg-[#000000]
        cursor-pointer
        ${className}
      `}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default RoundedBtn;
