import { useEffect, useState } from "react";
import VideoURL from "/assets/img/Goushala.mp4";

const VideoBg1: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <video
      className="video-background"
      src={VideoURL}
      autoPlay
      muted
      loop
      playsInline
    />
  );
};

export default VideoBg1;
