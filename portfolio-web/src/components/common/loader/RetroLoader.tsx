import { useEffect, useState } from "react";

const BLOCK_SIZE = 200;

export default function RetroLoader() {
  const [blocks, setBlocks] = useState<number[]>([]);
  const [cols, setCols] = useState(0);

  useEffect(() => {
    const updateGrid = () => {
      const columns = Math.ceil(window.innerWidth / BLOCK_SIZE);
      const rows = Math.ceil(window.innerHeight / BLOCK_SIZE);
      setCols(columns);
      setBlocks(new Array(columns * rows).fill(0));
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => prev.map(() => Math.random()));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden justify-around items-center flex">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${BLOCK_SIZE}px)`,
        }}
      >
        {blocks.map((v, i) => (
          <div
            key={i}
            className="h-[80px] w-[80px] transition-opacity duration-75"
            style={{
              backgroundColor: "#86efac", // green-500
              opacity: v > 0.7 ? 1 : v > 0.4 ? 0.5 : 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
