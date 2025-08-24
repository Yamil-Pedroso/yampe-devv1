import { Router } from "express";
import AboutModel from "../about/about.model";
import { SkillModel } from "../skills/skills.model";
import {
  ProjectModel,
  ProjectsSettingsModel,
} from "../projects/projects.model";
import {
  TestimonialModel,
  TestimonialsSettingsModel,
} from "../testimonials/testimonials.model";
import { ServiceModel, ServiceSettingsModel } from "../services/services.model";
import { BlogSettingsModel } from "../news-&-blogs/news&blogs.model";

const r = Router();

r.get("/home", async (_req, res) => {
  try {
    const [
      about,
      skills,
      projects,
      testimonials,
      services,
      // settings
      servicesSettings,
      projectsSettings,
      testimonialsSettings,
      blogSettings,
    ] = await Promise.all([
      AboutModel.findOne({ status: "published" })
        .select(
          "header title description image features infoContact roleTags seo"
        )
        .lean(),

      // Skills publicadas (top 12, orden por categoría y nivel)
      SkillModel.find({ status: "published" })
        .select("category tech level icon")
        .sort({ category: 1, level: -1 })
        .limit(12)
        .lean(),

      // Projects publicados (top 6)
      ProjectModel.find({ status: "published" })
        .select("title subtitle image iconKey order")
        .sort({ order: 1, createdAt: -1 })
        .limit(6)
        .lean(),

      // Testimonials aprobados (top 4)
      TestimonialModel.find({ status: "approved" })
        .select("author position quote avatar order")
        .sort({ order: 1, createdAt: -1 })
        .limit(4)
        .lean(),

      // Services publicados (todos o limita si quieres top N)
      ServiceModel.find({ status: "published" })
        .select("stepNumber title description iconKey order")
        .sort({ order: 1, stepNumber: 1 })
        .lean(),

      // SETTINGS (para headers/títulos de sección)
      ServiceSettingsModel.findOne({ status: "published" })
        .select("header")
        .lean(),
      ProjectsSettingsModel.findOne({ status: "published" })
        .select("header")
        .lean(),
      TestimonialsSettingsModel.findOne({ status: "published" })
        .select("header description")
        .lean(),
      BlogSettingsModel.findOne({ status: "published" })
        .select("header")
        .lean(),
    ]);

    // Si quieres skills agrupadas por categoría ya desde el backend:
    // const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    //   (acc[s.category] ||= []).push(s);
    //   return acc;
    // }, {});

    res.set("Cache-Control", "public, max-age=60, s-maxage=300").json({
      about, // { header, title, description, image }
      skills, // o skillsByCategory si activas el agrupado
      projects, // [{ title, subtitle, image, iconKey, order }]
      testimonials, // [{ author, position, quote, avatar, order }]
      services, // [{ stepNumber, title, description, iconKey, order }]

      // headers para render rápido en Home
      sections: {
        servicesHeader: servicesSettings?.header ?? "My Services",
        projectsHeader: projectsSettings?.header ?? "My Works",
        testimonialsHeader: testimonialsSettings?.header ?? "Testimonials",
        testimonialsDescription: testimonialsSettings?.description ?? "",
        blogHeader: blogSettings?.header ?? "News & Blogs",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error fetching home data",
      error: err.message,
    });
  }
});

export default r;
