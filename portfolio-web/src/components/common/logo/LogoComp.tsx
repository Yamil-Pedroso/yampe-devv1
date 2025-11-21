import React from "react";

interface LogoCompProps {
  className?: string;
  width?: number;
  height?: number;
}

const LogoComp: React.FC<LogoCompProps> = ({ className, width, height }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 opacity-90 " />

      {/* Inner square */}
      <div
        className={`absolute rounded-xl bg-[#0d0d0d] border border-white/10 shadow-lg flex items-center justify-center`}
        style={{ width, height }}
      >
        <span
          className={`
  absolute
  font-mono font-bold
  text-transparent bg-clip-text
  bg-gradient-to-r from-purple-500 to-blue-300
`}
        >
          {"</>"}
        </span>
      </div>
    </div>
  );
};

export default LogoComp;
