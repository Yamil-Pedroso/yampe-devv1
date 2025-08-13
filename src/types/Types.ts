import { IconType } from "react-icons";

export interface CommonContent {
  header: string;
  title?: string;
  description?: string;
  features?: FeatureItem[];
  icon?: IconType | string;
  image?: string;
}
export interface FeatureItem {
  text: string;
  icon?: IconType | string;
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
  value: string;
  label: string;
}

export interface HeroButton {
  text: string;
  href: string;
  icon?: IconType | string;
}

export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  description: string;
  buttons: HeroButton[];
  image: {
    src: string;
    alt: string;
  };
  stats: HeroStat[];
}

export interface AboutMeData extends CommonContent {
  email?: string;
  phone?: string;
  infoContact?: { text1: string; text2: string; icon: string | IconType }[];
  roleTags?: { text: string; icon: string }[];
}

export interface ResumeData extends CommonContent {
  experience?: {
    jobTitle: string;
    company: string;
    year: string;
    icon: string | IconType;
  }[];
  skills?: string[];
}

export interface ServicesData extends CommonContent {
  services?: {
    stepNumber: string;
    title: string;
    description: string;
    icon: string | IconType;
  }[];
}

type SkillCategory =
  | "frontend"
  | "backend"
  | "databases"
  | "design"
  | "devops"
  | "architecture";

export interface SkillItem {
  tech: string;
  level: number;
  icon?: string | IconType;
}

export interface SkillsData extends CommonContent {
  skills: Partial<Record<SkillCategory, SkillItem[]>>;
}

export default menuItems;
