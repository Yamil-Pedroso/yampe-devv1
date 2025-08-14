import { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>&copy; {year} Yampe.dev. All rights reserved.</p>
    </div>
  );
};

export default Footer;
