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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - Stack vertical */}
        <div className="flex flex-col sm:hidden items-center gap-4 text-center">
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            &copy; {year}{" "}
            <span className="text-color0 font-medium">Yampe.dev</span>. All
            rights reserved.
          </p>

          <nav aria-label="Social links" className="w-full">
            <ul className="flex flex-wrap justify-center gap-4">
              {infoFooterData.socialLinks?.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    className="text-zinc-300 transition hover:text-white text-xs sm:text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Tablet & Desktop Layout - Horizontal */}
        <div className="hidden sm:flex items-center justify-between gap-6">
          <p className="text-sm md:text-base text-zinc-300 flex-shrink-0">
            &copy; {year}{" "}
            <span className="text-color0 font-medium">Yampe.dev</span>. All
            rights reserved.
          </p>

          <nav aria-label="Social links" className="flex-shrink-0">
            <ul className="flex gap-6 md:gap-8 lg:gap-12">
              {infoFooterData.socialLinks?.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    className="text-zinc-300 transition hover:text-white text-sm md:text-base font-medium whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
