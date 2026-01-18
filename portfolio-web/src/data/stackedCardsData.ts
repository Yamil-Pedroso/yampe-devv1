import { StackedCard } from "../types/Types";
import { FaCode, FaLaptop } from "react-icons/fa";
import assets from "@/assets";

export const stackedCardsData: StackedCard[] = [
  {
    id: 1,
    type: "main",
    title:
      "1-Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: FaCode,
    img: assets.icon1,
  },
  {
    id: 2,
    type: "glass",
    title:
      "2-Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: FaLaptop,
    img: assets.icon2,
  },
  {
    id: 3,
    type: "dark",
    title:
      "3-Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: FaCode,
    img: assets.icon3,
  },
  {
    id: 4,
    type: "light",
    title:
      "4-Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: FaCode,
    img: assets.icon4,
  },
  {
    id: 5,
    type: "light",
    title:
      "4-Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: FaCode,
    img: assets.icon5,
  },
];
