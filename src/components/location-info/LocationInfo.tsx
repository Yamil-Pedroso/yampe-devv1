import { useEffect, useState } from "react";
import SocialLinks from "../navbar/SocialLinks";

interface LocationInfoProps {
  classContainer?: string;
  className?: string;
  highlightClass?: string;
  clockClass?: string;
  greetingClass?: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
  classContainer = "",
  className = "",
  highlightClass = "",
  clockClass = "",
  greetingClass = "",
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className={`${classContainer}`}>
      <p className={`${className}`}>
        I'm based in <span className={`${highlightClass}`}>Zürich</span> and
        work hybrid.
      </p>

      <div className={` ${clockClass}`}>
        {currentTime} <span className={`${greetingClass}`}>{greeting}</span>
      </div>

      <SocialLinks className=" flex mt-6 justify-end large:justify-start" />
    </div>
  );
};

export default LocationInfo;
