import { useEffect, useState } from "react";
import { getRandomSizes } from "@/utils/getRandomSizes";
import { getRandomPositions } from "@/utils/getRandomPositions";
import { getRandomColors } from "@/utils/getRandomColos";

const BOX_COUNT = 10;

const ShapesAni = () => {
  const [boxes, setBoxes] = useState(() =>
    Array.from({ length: BOX_COUNT }).map(() => ({
      size: getRandomSizes(),
      position: getRandomPositions(0),
      backgroundColor: getRandomColors(),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prevBoxes) =>
        prevBoxes.map(() => ({
          size: getRandomSizes(),
          position: getRandomPositions(0),
          backgroundColor: getRandomColors(),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
      {boxes.map((box, index) => (
        <div
          key={index}
          style={{
            width: `${box.size}px`,
            height: `${box.size}px`,
            backgroundColor: box.backgroundColor,
            opacity: 0.5,
            top: box.position.y,
            left: box.position.x,
            transition:
              "top 1s ease-in-out, left 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out, background-color 1s ease-in-out",
          }}
          className="object-contain"
        ></div>
      ))}
    </div>
  );
};

export default ShapesAni;
