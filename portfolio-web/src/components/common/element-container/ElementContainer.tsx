import React from "react";

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

  border,
  onClick,
}: ElementContainerProps) => {
  return (
    <div
      onClick={onClick}
      className={`
          ${border ? "border border-color3" : ""}
           overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default ElementContainer;
