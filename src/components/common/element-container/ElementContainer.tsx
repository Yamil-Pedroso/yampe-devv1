interface ElementContainerProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  bgColor?: string;
}

const ElementContainer = ({
  children,
  className,
  border,
}: ElementContainerProps) => {
  return (
    <div
      className={`
          ${border ? "border border-border-color" : ""}
          rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default ElementContainer;
