import { PIXEL_MAC } from "./PIXEL_MAC";
import PixelMacRenderer from "./PixelMacRenderer";

export default function PixelMac() {
  return (
    <div
      className="inline-block"
      style={{
        boxShadow: "6px 6px 0 #000",
        border: "2px solid #000",
        padding: 4,
        background: "#000",
      }}
    >
      <PixelMacRenderer pixelMap={PIXEL_MAC} pixelSize={6} />
    </div>
  );
}
