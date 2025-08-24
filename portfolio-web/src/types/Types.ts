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
  id: string;
  title: string;
  href: string;
  submenus?: string[]; // Optional submenus for dropdowns
}

export const menuItems: MenuItem[] = [
  { id: "home", title: "Home", href: "#home" },
  { id: "about", title: "About", href: "#about" },
  { id: "resume", title: "Resume", href: "#resume" },
  { id: "services", title: "Services", href: "#services" },
  { id: "skills", title: "Skills", href: "#skills" },
  {
    id: "projects",
    title: "Projects",
    href: "/projects-gallery",
    submenus: ["Projects gallery"],
  },
  { id: "blogs", title: "Blogs", href: "/news-blogs", submenus: ["Blogs all"] },
  { id: "contact", title: "Contact", href: "#contact" },
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

export interface ProjectsData extends CommonContent {
  projects?: {
    id: string | number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    imageDetails: string[];
    link: string;
    icon?: string | IconType;
  }[];
}

export interface TestimonialsData extends CommonContent {
  testimonials: {
    avatar: string;
    quote: string;
    author: string;
    position: string;
    icon?: string | IconType;
  }[];
}

export interface GetInTouchData extends CommonContent {
  servicesTags?: { text: string; icon: string | IconType }[];
}

export interface NewsAndBlogsData extends CommonContent {
  newsAndBlogs: {
    id: string | number;
    image: string;
    tags: string[];
    excerpt: string;
    author: string;
    date: string;
    icon?: string | IconType;
  }[];
}

export interface ClientsAndFirmasData {
  institutions: {
    logo: string;
    link: string;
  }[];
}

export interface InfoFooterData {
  quickLinks?: { text: string; href: string }[];
  address?: { street: string; email: string; phone: string };
  socialLinks?: { platform: string; url: string }[];
}

export default menuItems;
