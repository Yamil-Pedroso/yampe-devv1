interface ElementContainerProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  bgColor?: string;
  as?: React.ElementType;
}

const ElementContainer = ({
  children,
  className,
  as: Component = "div",
  border,
}: ElementContainerProps) => {
  return (
    <Component
      className={`
          ${border ? "border border-border-color" : ""}
          rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </Component>
  );
};

export default ElementContainer;
