import React from "react";

interface PixelLoaderProps {
  totalPixels?: number;
  activePixels?: number;
  pixelSize?: number;
}

const PixelLoader: React.FC<PixelLoaderProps> = ({
  totalPixels = 20,
  activePixels = 10,
  pixelSize = 5,
}) => {
  return (
    <div
      className="flex items-center gap-1 p-1 border-2 border-black bg-transparent"
      style={{ height: pixelSize + 6 }}
    >
      {Array.from({ length: totalPixels }).map((_, i) => (
        <span
          key={i}
          className={`
            transition-opacity duration-200
            ${i < activePixels ? "opacity-100" : "opacity-0"}
            bg-green-500
          `}
          style={{
            width: pixelSize,
            height: pixelSize,
          }}
        />
      ))}
    </div>
  );
};

export default PixelLoader;
