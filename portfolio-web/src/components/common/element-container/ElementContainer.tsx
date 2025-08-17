interface ElementContainerProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  bgColor?: string;
  as?: React.ElementType;
  onClick?: () => void;
}

const ElementContainer = ({
  children,
  className,
  as: Component = "div",
  border,
  onClick,
}: ElementContainerProps) => {
  return (
    <Component
      onClick={onClick}
      className={`
          ${border ? "border border-border-color" : ""}
          rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </Component>
  );
};

export default ElementContainer;
