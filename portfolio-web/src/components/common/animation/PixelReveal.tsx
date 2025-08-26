import { useEffect, useState } from "react";
import { ImagePixelated } from "react-pixelate";

export default function PixelReveal({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const [size, setSize] = useState(24);

  useEffect(() => {
    let s = 24;
    const id = setInterval(() => {
      s = Math.max(1, s - 1);
      setSize(s);
      if (s === 1) clearInterval(id);
    }, 50); // ~1.2s total
    return () => clearInterval(id);
  }, []);

  return (
    <ImagePixelated src={src} pixelSize={size} width={width} height={height} />
  );
}
