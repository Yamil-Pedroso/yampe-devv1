import React, { useEffect, useRef } from "react";

interface VideoCompProps {
  src: string;
  type?: string;
  className?: string;
  controls?: boolean;
  poster?: string;
  preload?: "auto" | "metadata" | "none";
  onError?: React.ReactEventHandler<HTMLVideoElement>;
}

const VideoComp: React.FC<VideoCompProps> = ({
  src,
  type = "video/mp4",
  className = "",
  controls = false,
  poster,
  preload = "metadata",
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intentar reproducir automáticamente
    video.play().catch(() => {
      console.warn("Autoplay blocked by browser");
    });

    // Cuando termina, rebobinar y esperar antes de reiniciar
    const handleEnded = () => {
      video.currentTime = 0; // rebobina inmediatamente
      video.pause(); // pausa para evitar el último frame congelado

      const delay = 10000; // 10 segundos
      setTimeout(() => {
        if (video) video.play();
      }, delay);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      controls={controls}
      poster={poster}
      preload={preload}
      className={className}
      onError={onError}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComp;
