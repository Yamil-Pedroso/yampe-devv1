import React from "react";
//import { TbBrandGithubFilled } from "react-icons/tb";
//import { BiLogoUpwork } from "react-icons/bi";
//import { FaLinkedinIn } from "react-icons/fa";
//import { IconType } from "react-icons";
import { PixelIconType } from "./PixelIcon";
import PixelIcon from "./PixelIcon";
import RetroButton from "../../common/buttons/RetroButton";
import { useSound } from "../sounds/SoundComp";

interface PlatformItemProps {
  url: string;
  iconType: PixelIconType;
  containerColor: string;
}

const platformData: PlatformItemProps[] = [
  {
    url: "https://www.linkedin.com/in/yamil-pedroso/",
    iconType: "linkedin",
    containerColor: "bg-green-700",
  },
  {
    url: "https://github.com/Yamil-Pedroso",
    iconType: "github",
    containerColor: "bg-green-700",
  },
  {
    url: "https://www.upwork.com/nx/search/talent/?nbs=1&q=Yamil%20Pedroso",
    iconType: "upwork",
    containerColor: "bg-green-700",
  },
];

const PlatformItem: React.FC = () => {
  const playClickSound = useSound("/sounds/modern-tech-click.wav", 0.2);

  return (
    <ul className="flex justify-center items-center sm:text-4xl mr-10 ">
      {platformData.map((platform, i) => {
        return (
          <RetroButton
            key={i}
            className="mx-2 sm:mx-3 px-6 py-3 group"
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
          >
            <li
              className={`
              mx-3 sm:mx-4
              transition-colors
              duration-300


            `}
            >
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <PixelIcon type={platform.iconType} size={40} />
              </a>
            </li>
          </RetroButton>
        );
      })}
    </ul>
  );
};

export default PlatformItem;
