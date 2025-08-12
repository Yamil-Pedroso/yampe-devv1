import { IconType } from "react-icons";

export interface FeatureItem {
  text: string;
  icon?: React.ReactNode | string;
}

export interface CommonContent {
  header: string;
  title: string;
  description: string;
  features?: FeatureItem[];
  icon?: IconType | string;
  image?: string;
}

export interface MenuItem {
  title: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#" },
  { title: "Resume", href: "/#" },
  { title: "Services", href: "/#" },
  { title: "Projects", href: "/#" },
  { title: "Blogs", href: "/#" },
  { title: "Contact", href: "/#" },
];

export interface HeroStat {
  value: string; // Ej: "13+", "8k+", "99%+"
  label: string; // Ej: "Years Of Experience"
}

export interface HeroButton {
  text: string;
  href: string;
  icon?: IconType | string;
}

export interface HeroData {
  greeting: string; // Ej: "Hello, I’m"
  name: string; // Ej: "Roy C. Jones"
  role: string; // Ej: "web designer"
  description: string; // Texto descriptivo
  buttons: HeroButton[]; // Lista de botones
  image: {
    src: string;
    alt: string;
  };
  stats: HeroStat[]; // Lista de estadísticas
}

export interface AboutMeData extends CommonContent {
  email?: string;
  phone?: string;
  roleTags?: { text: string; icon: string }[];
}

export default menuItems;
