// src/components/BackgroundVideo.jsx
import { useEffect, useRef } from "react";
import "./backgroundVideo.css";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="video-bg"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/background.mp4" type="video/mp4" />
    </video>
  );
}
