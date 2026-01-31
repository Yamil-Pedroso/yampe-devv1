import { useEffect, useState } from "react";
import PixelLoader from "./PixelLoader";

export default function LoadingBarDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev >= 20 ? 0 : prev + 1));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return <PixelLoader totalPixels={20} activePixels={active} />;
}
