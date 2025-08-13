interface ElementContainerProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}

const ElementContainer = ({
  children,
  className,
  border,
}: ElementContainerProps) => {
  return (
    <div
      className={`bg-bg1-color
          ${border ? "border border-border-color" : ""}
          rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default ElementContainer;
