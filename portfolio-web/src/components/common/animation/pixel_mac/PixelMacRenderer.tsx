interface PixelMacRendererProps {
  pixelMap: string[];
  pixelSize?: number;
}

const COLORS: Record<string, string> = {
  "1": "#d6d0c4", // cuerpo
  "2": "#111111", // pantalla
  "3": "#555555", // detalles
};

export default function PixelMacRenderer({
  pixelMap,
  pixelSize = 6,
}: PixelMacRendererProps) {
  //const rows = pixelMap.length;
  const cols = pixelMap[0].length;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        gap: 1,
      }}
    >
      {pixelMap.flatMap((row, y) =>
        row.split("").map((cell, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: COLORS[cell] ?? "transparent",
            }}
          />
        )),
      )}
    </div>
  );
}
