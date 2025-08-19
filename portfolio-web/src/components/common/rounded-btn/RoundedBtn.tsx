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
      className={`flex justify-center items-center text-bg1-color ${width} ${height} rounded-full bg-color0 cursor-pointer ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default RoundedBtn;
