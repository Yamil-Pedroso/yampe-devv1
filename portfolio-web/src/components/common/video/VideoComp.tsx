import React from "react";

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
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls={controls}
      poster={poster}
      preload={preload}
      className={className}
      onError={onError}
    >
      <source src={src} type={type} />
      {/* Fallback-Text */}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComp;
