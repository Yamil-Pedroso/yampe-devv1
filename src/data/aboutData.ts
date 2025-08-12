import { AboutMeData } from "../types/Types";

export const aboutMeData: AboutMeData = {
  header: "About Me",
  title: "Professional Problem Solutions For Digital Products",
  description:
    "At vero eos et accusamus et odio dignissimos ducimus praesentium voluptatum corrupti quos dolores quas molestias excepturi sint occaecati cupiditate provident qui officia deserunt mollitia animi, id est laborum et dolorum.",
  features: [
    { text: "Branding & Design", icon: "check-icon-path" },
    { text: "Web Development", icon: "check-icon-path" },
    { text: "Digital Marketing", icon: "check-icon-path" },
    { text: "Product Design", icon: "check-icon-path" },
  ],
  image: "/images/about-me.jpg", // ruta a la imagen del chico
  email: "support@gmail.com",
  phone: "+880 (123) 456 88",
  roleTags: [
    { text: "Experience Designer", icon: "/icons/experience.svg" },
    { text: "Mark J. Collins", icon: "/icons/user.svg" },
  ],
};
