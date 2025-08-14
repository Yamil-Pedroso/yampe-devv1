import { useState, useEffect } from "react";
import { infoFooterData } from "@/data/infoFooterData";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      <p>&copy; {year} Yampe.dev. All rights reserved.</p>

      <div>
        <nav aria-label="Quick links">
          <ul className="space-y-3 flex">
            {infoFooterData.socialLinks?.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  className="text-zinc-300 transition hover:text-white"
                >
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
