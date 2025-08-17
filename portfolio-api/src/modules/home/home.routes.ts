// modules/home/home.routes.ts
//import { Router } from "express";
//import About from "../about/about.model";
//import Skill from "../skills/skills.model";
//import Project from "../projects/projects.model";
//import Testimonial from "../testimonials/testimonials.model";
//
//const r = Router();
//
//r.get("/", async (_req, res) => {
//  const [about, skills, projects, testimonials] = await Promise.all([
//    About.findOne({ status: "published" }).select("header title description image").lean(),
//    Skill.find({ featured: true }).select("name slug level iconKey order").sort({ order: 1 }).limit(12).lean(),
//    Project.find({ featured: true }).select("title slug media seo").sort({ order: 1 }).limit(6).lean(),
//    Testimonial.find({ status: "approved" }).select("authorName content order").sort({ order: 1 }).limit(4).lean(),
//  ]);
//  res.set("Cache-Control", "public, max-age=60, s-maxage=300").json({ about, skills, projects, testimonials });
//});

//export default r;
