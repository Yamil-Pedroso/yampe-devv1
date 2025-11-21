import { InfoFooterData } from "@/types/Types";

export const infoFooterData: InfoFooterData = {
  quickLinks: [
    { text: "About", href: "#about" },
    { text: "Service", href: "#services" },
    { text: "Projects", href: "#projects" },
    { text: "Skills", href: "#skills" },
  ],
  address: {
    street: "Kreuzstraße 33, Zürich, Switzerland",
    email: "yamilpedroso@gmail.com",
    phone: "+41 79 532 65 19",
  },
  socialLinks: [
    { platform: "Github", url: "https://github.com/Yamil-Pedroso" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/yamil-pedroso" },
  ],
};
