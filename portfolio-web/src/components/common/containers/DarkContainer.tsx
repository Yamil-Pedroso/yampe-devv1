import React from "react";

interface DarkContainerProps {
  children: React.ReactNode;
  className?: string;
}

const DarkContainer = ({ children, className }: DarkContainerProps) => {
  return (
    <div
      className={`flex items-center justify-center mt-30 bg-[#070707] p-[8.125rem] gap-12  ${className}`}
    >
      {children}
    </div>
  );
};

export default DarkContainer;
