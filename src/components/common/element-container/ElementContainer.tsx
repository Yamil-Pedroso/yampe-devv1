interface ElementContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ElementContainer = ({ children, className }: ElementContainerProps) => {
  return (
    <div
      className={`bg-bg1-color border border-border-color rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default ElementContainer;
