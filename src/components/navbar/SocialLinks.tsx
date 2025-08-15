import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-7">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="/images/avatar/yami.jpg"
            alt="Yampe.dev"
            className="w-full h-full object-cover"
          />
        </div>
        <a
          href="https://www.linkedin.com/in/yamil-pedroso/"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-color0 transition-colors "
        >
          <FaLinkedinIn size={36} className="inline" />
        </a>

        <a
          href="https://github.com/Yamil-Pedroso"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-color0 transition-colors "
        >
          <TbBrandGithubFilled size={36} className="inline" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
