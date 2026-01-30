import { useRef } from "react";

export function useSound(src: string, volume = 0.3) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current && typeof window !== "undefined") {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
  }

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return play;
}
