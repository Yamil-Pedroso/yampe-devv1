import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StackedCard as Card } from "../../types/Types";
import { stackedCardsData as cardsData } from "../../data/stackedCardsData";

const STACK_INTERVAL = 20000;
const DRAG_THRESHOLD = 120;

const positions = [
  { x: 180, y: 60, scale: 0.5, rotate: -6, z: 0 },
  { x: -100, y: -20, scale: 0.6, rotate: 8, z: 0 },
  { x: 60, y: -10, scale: 0.8, rotate: -2, z: 0 },
  { x: -10, y: -130, scale: 1.02, rotate: 0, z: 0 },
  { x: 0, y: -250, scale: 1.8, rotate: 0, z: 1 },
];

const StackedCards = () => {
  const [cards, setCards] = useState<Card[]>(cardsData);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      triggerSwap();
    }, STACK_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const triggerSwap = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCards((prev) => {
        const last = prev[prev.length - 1];
        return [last, ...prev.slice(0, -1)];
      });
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="relative w-[350px] h-[500px] mt-20">
      {cards.map((card, index) => {
        const pos = positions[index];
        const isTop = index === cards.length - 1;

        return (
          <motion.div
            key={card.id}
            drag={isTop && !isAnimating ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > DRAG_THRESHOLD) {
                triggerSwap();
              }
            }}
            onClick={() => isTop && triggerSwap()}
            className={`
              absolute top-1/2 left-1/2
              w-[100px] h-[100px]
              rounded-3xl
              -translate-x-1/2 -translate-y-1/2
              cursor-pointer


              ${
                card.type === "main"
                  ? `
                    bg-[#2a2a2a]
                    shadow-md shadow-blue-500

                    text-white
                  `
                  : card.type === "glass"
                    ? `
                    bg-[#2a2a2a]
                    shadow-md shadow-blue-500
                    text-white
                  `
                    : card.type === "dark"
                      ? `
                    bg-[#2a2a2a]
                    shadow-md shadow-blue-500
                    text-white
                  `
                      : `
                    bg-[#2a2a2a]
                    shadow-md shadow-blue-500
                    text-white
                  `
              }
            `}
            animate={
              isTop && isAnimating
                ? {
                    x: pos.x * 1.5,
                    y: pos.y + 60,
                    scale: 0.85,
                    rotate: pos.rotate - 8,
                    rotateY: 0,
                    opacity: 0,
                  }
                : {
                    x: pos.x,
                    y: pos.y,
                    scale: pos.scale,
                    rotate: pos.rotate,
                    rotateY: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            style={{ zIndex: pos.z }}
          >
            <div className="p-4 h-full flex flex-col justify-between pointer-events-none">
              <img
                src={card.img}
                alt={"Card Image"}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StackedCards;
