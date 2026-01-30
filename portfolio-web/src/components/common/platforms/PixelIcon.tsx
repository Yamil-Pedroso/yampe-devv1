import React from "react";
import clsx from "clsx";

export type PixelIconType = "linkedin" | "github" | "upwork";

interface PixelIconProps {
  type: PixelIconType;
  size?: number;
  className?: string;
}

const PixelIcon: React.FC<PixelIconProps> = ({
  type,
  size = 24,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={clsx(
        "text-white opacity-40 group-hover:text-yellow-400 group-hover:opacity-80 transition-opacity duration-300",
        className,
      )}
    >
      {type === "linkedin" && (
        <>
          <rect x="3" y="6" width="2" height="7" fill="currentColor" />
          <rect x="3" y="4" width="2" height="1" fill="currentColor" />
          <rect x="7" y="6" width="2" height="7" fill="currentColor" />
          <rect x="9" y="6" width="2" height="2" fill="currentColor" />
          <rect x="11" y="8" width="2" height="5" fill="currentColor" />
        </>
      )}

      {type === "github" && (
        <>
          <rect x="4" y="4" width="8" height="8" fill="currentColor" />
          <rect x="3" y="3" width="2" height="2" fill="currentColor" />
          <rect x="11" y="3" width="2" height="2" fill="currentColor" />
          <rect x="6" y="7" width="1" height="1" fill="currentColor" />
          <rect x="9" y="7" width="1" height="1" fill="currentColor" />
          <rect x="7" y="9" width="2" height="1" fill="currentColor" />
        </>
      )}

      {type === "upwork" && (
        <>
          <rect x="3" y="6" width="2" height="5" fill="currentColor" />
          <rect x="5" y="11" width="2" height="2" fill="currentColor" />
          <rect x="7" y="6" width="2" height="5" fill="currentColor" />
          <rect x="10" y="6" width="2" height="7" fill="currentColor" />
          <rect x="12" y="6" width="1" height="1" fill="currentColor" />
          <rect x="13" y="7" width="1" height="2" fill="currentColor" />
          <rect x="12" y="9" width="1" height="1" fill="currentColor" />
        </>
      )}
    </svg>
  );
};

export default PixelIcon;
