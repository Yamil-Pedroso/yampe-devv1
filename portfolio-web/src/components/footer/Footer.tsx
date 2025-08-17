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
    <div className="flex items-center justify-around p-5">
      <p>
        &copy; {year} <span className="text-color0">Yampe.dev</span>. All rights
        reserved.
      </p>

      <nav aria-label="Quick links">
        <ul className=" flex gap-12">
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
  );
};

export default Footer;
