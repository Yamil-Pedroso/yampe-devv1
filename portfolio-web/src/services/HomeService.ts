import apiClient from "../api/axiosConfig";

export type AboutDTO = {
  header: string;
  title: string;
  description: string;
  image?: string;
  features?: { text: string; icon?: string }[];
  infoContact?: { text1: string; text2: string; icon?: string }[];
  roleTags?: { text: string; icon?: string }[];
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
};

export type SkillDTO = {
  category: string;
  tech: string;
  level: number;
  icon?: string;
};

export type ProjectDTO = {
  title: string;
  subtitle?: string;
  image: string;
  iconKey?: string;
  order?: number;
};

export type TestimonialDTO = {
  author: string;
  position?: string;
  quote: string;
  avatar?: string;
  order?: number;
};

export type ServiceDTO = {
  stepNumber: string;
  title: string;
  description?: string;
  iconKey?: string;
  order?: number;
};

export type HomeSections = {
  servicesHeader: string;
  projectsHeader: string;
  testimonialsHeader: string;
  testimonialsDescription?: string;
  blogHeader: string;
};

export type HomeResponse = {
  about: AboutDTO | null;
  skills: SkillDTO[];
  projects: ProjectDTO[];
  testimonials: TestimonialDTO[];
  services: ServiceDTO[];
  sections: HomeSections;
};

export async function fetchHome(): Promise<HomeResponse> {
  try {
    const { data } = await apiClient.get<HomeResponse>("/home");

    return {
      about: data.about ?? null,
      skills: data.skills ?? [],
      projects: data.projects ?? [],
      testimonials: data.testimonials ?? [],
      services: data.services ?? [],
      sections: data.sections ?? {
        servicesHeader: "My Services",
        projectsHeader: "My Projects",
        testimonialsHeader: "Testimonials",
        blogHeader: "News & Blogs",
      },
    };
  } catch {
    return {
      about: null,
      skills: [],
      projects: [],
      testimonials: [],
      services: [],
      sections: {
        servicesHeader: "My Services",
        projectsHeader: "My Projects",
        testimonialsHeader: "Testimonials",
        blogHeader: "News & Blogs",
      },
    };
  }
}
