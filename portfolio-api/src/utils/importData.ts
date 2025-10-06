import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";

import connectDB from "../config/db";

import AboutModel from "../modules/about/about.model";
import {
  ServiceModel,
  ServiceSettingsModel,
} from "../modules/services/services.model";
import {
  SkillModel,
  SkillsSettingsModel,
} from "../modules/skills/skills.model";
import {
  TestimonialModel,
  TestimonialsSettingsModel,
} from "../modules/testimonials/testimonials.model";
import {
  ProjectModel,
  ProjectsSettingsModel,
} from "../modules/projects/projects.model";

import { aboutMeData } from "../data/aboutData";
import { servicesData } from "../data/servicesData";
import { skillsData } from "../data/skillsData";
import { testimonialsData } from "../data/testimonialsData";
import { projectsData } from "../data/projectsData";

dotenv.config({ path: path.resolve(__dirname, "..", "config", "config.env") });

// --- helpers ---
colors.enable();

const TAG_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  rb: "ruby",
  csharp: "c#",
  dotnet: ".net",
  html: "html5",
  css: "css3",
  scss: "sass",
  tailwind: "tailwindcss",
  nodejs: "nodejs",
  expressjs: "express",
  nestjs: "nestjs",
  mongodb: "mongodb",
  mysql: "mysql",
  postgresql: "postgresql",
  git: "git",
  github: "github",
  docker: "docker",
  aws: "aws",
};

function normalizeTags(tags?: string[]) {
  if (!Array.isArray(tags)) return [];
  const norm = tags
    .map((t) => (t ?? "").trim().toLowerCase())
    .filter(Boolean)
    .map((t) => TAG_ALIASES[t] ?? t);
  return Array.from(new Set(norm));
}

// helper slug
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const CLEAN = process.argv.includes("--clean");
const ONLY = getArgValue("--only"); // ej: --only=about,skills

function getArgValue(flag: string) {
  const arg = process.argv.find((a) => a.startsWith(flag + "="));
  return arg ? arg.split("=")[1] : undefined;
}

// Convert React component to icon key string
function toIconKey(icon: unknown, fallback?: string): string | undefined {
  if (!icon) return fallback;
  if (typeof icon === "string") return icon;
  if (typeof icon === "function" && (icon as any).name)
    return (icon as any).name; // p.ej. "FaCheck"
  return fallback;
}

async function main() {
  await connectDB();

  if (CLEAN) {
    await cleanCollections();
  }
  // REGISTRY: each entry knows how to seed its section
  const REGISTRY: Record<string, () => Promise<void>> = {
    about: seedAbout,
    services: seedServices,
    skills: seedSkills,
    testimonials: seedTestimonials,
    projects: seedProjects,
  };

  const keys = ONLY ? ONLY.split(",") : Object.keys(REGISTRY);

  for (const key of keys) {
    const fn = REGISTRY[key];
    if (!fn) {
      console.log(colors.yellow(`⚠️  Sección desconocida: ${key} — omitida`));
      continue;
    }
    console.log(colors.cyan(`\n→ Seeding ${key}...`));
    await fn();
    console.log(colors.green(`✔ ${key} OK`));
  }

  console.log(colors.green("\n✅ Import done."));
  await mongoose.disconnect();
  process.exit(0);
}

// ================== SEEDERS ==================

// ABOUT: a single document, mapping ALL the properties of the model //
// ================== SEEDERS ==================
async function seedAbout() {
  const payload = {
    header: aboutMeData.header,
    title: aboutMeData.title,
    description: aboutMeData.description,
    status: "published",

    // Image is a STRING in your model
    image: typeof aboutMeData.image === "string" ? aboutMeData.image : "",

    // Features use 'icon' (not iconKey) according to your schema
    features: (aboutMeData.features ?? []).map((f) => ({
      text: f.text,
      icon: typeof f.icon === "string" ? f.icon : undefined,
    })),

    // InfoContact use text1/text2/icon according to your schema
    infoContact: (aboutMeData.infoContact ?? []).map((c) => ({
      text1: c.text1,
      text2: (c.text2 ?? "").toString().trim(),
      icon: typeof c.icon === "string" ? c.icon : undefined,
    })),

    // RoleTags is already correct (text, icon)
    roleTags: (aboutMeData.roleTags ?? []).map((r) => ({
      text: r.text,
      icon: r.icon,
    })),

    // Optional: your schema allows seo (all strings)
    seo: {
      metaTitle: aboutMeData.title,
      metaDescription: aboutMeData.description?.slice(0, 150),
      ogImage:
        typeof aboutMeData.image === "string" ? aboutMeData.image : undefined,
    },
  };

  await AboutModel.findOneAndUpdate({}, payload, { new: true, upsert: true });
  console.log("✔ About seeded");
}

// SERVICES: settings + items (ojo: stepNumber es STRING tipo "01.")
async function seedServices() {
  if (!servicesData) return;

  // 1) Settings
  await ServiceSettingsModel.findOneAndUpdate(
    {},
    { header: servicesData.header, status: "published" },
    { upsert: true, new: true }
  );

  // 2) Items -> normalize and add slug
  const items = (servicesData.services ?? []).map((s: any, i: number) => {
    const stepNumber = String(
      s.stepNumber ?? `${String(i + 1).padStart(2, "0")}.`
    );
    const slug = slugify(s.title); // 👈 clave estable
    return {
      slug,
      stepNumber,
      title: s.title,
      description: s.description,
      iconKey: s.icon,
      status: "published" as const,
      order: i + 1,
    };
  });

  // 3) Upsert by slug (efficient with bulkWrite)
  await ServiceModel.bulkWrite(
    items.map((doc) => ({
      updateOne: {
        filter: { slug: doc.slug }, // 👈 upsert por slug
        update: doc,
        upsert: true,
      },
    }))
  );
}

// SKILLS: settings + items (each skill is a document with category)
async function seedSkills() {
  if (!skillsData) return;

  await SkillsSettingsModel.findOneAndUpdate(
    {},
    {
      header: skillsData.header,
      description: skillsData.description,
      status: "published",
    },
    { upsert: true, new: true }
  );

  // Convert the categorized object to a flat array
  const groups = skillsData.skills as Record<
    string,
    Array<{ tech: string; level: number; icon?: string }>
  >;
  const entries = Object.entries(groups).flatMap(([category, arr]) =>
    (arr ?? []).map((s) => ({
      // must match the enum in the model: "frontend" | "backend" | ...
      category, // include category property
      tech: s.tech,
      level: s.level,
      icon: s.icon,
      status: "published" as const,
    }))
  );

  for (const e of entries) {
    await SkillModel.findOneAndUpdate(
      { category: e.category, tech: e.tech },
      e,
      { upsert: true, new: true }
    );
  }
}

// TESTIMONIALS: settings + items (iconKey fijo y status approved)
async function seedTestimonials() {
  if (!testimonialsData) return;

  await TestimonialsSettingsModel.findOneAndUpdate(
    {},
    {
      header: testimonialsData.header,
      description: testimonialsData.description,
      status: "published",
    },
    { upsert: true, new: true }
  );

  const items = (testimonialsData.testimonials ?? []).map(
    (t: any, i: number) => ({
      avatar: t.avatar,
      quote: t.quote,
      author: t.author,
      position: t.position,
      iconKey: "quoteLeft",
      lang: "en",
      status: "approved",
      order: i + 1,
    })
  );

  for (const it of items) {
    await TestimonialModel.findOneAndUpdate(
      { author: it.author, quote: it.quote },
      it,
      { upsert: true, new: true }
    );
  }
}

// PROJECTS: settings + items
async function seedProjects() {
  if (!projectsData) return;

  await ProjectsSettingsModel.findOneAndUpdate(
    {},
    { header: projectsData.header, status: "published" },
    { upsert: true, new: true }
  );

  const items = (projectsData.projects ?? []).map((p: any, i: number) => ({
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    image: p.image,
    imageDetails: Array.isArray(p.imageDetails) ? p.imageDetails : [],
    link: p.link,
    category: p.category,
    tags: Array.isArray(p.tags) ? p.tags : [],
    iconKey: toIconKey(p.icon, "MdOutlineArrowOutward"),
    status: "published",
    order: i + 1,
  }));

  for (const it of items) {
    await ProjectModel.findOneAndUpdate(
      { title: it.title, order: it.order }, // clave de upsert
      it,
      { upsert: true, new: true }
    );
  }
}

// CLEAN opcional
async function cleanCollections() {
  await Promise.all([
    AboutModel.deleteMany({}),
    ServiceSettingsModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    SkillsSettingsModel.deleteMany({}),
    SkillModel.deleteMany({}),
    TestimonialsSettingsModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
    ProjectsSettingsModel.deleteMany({}),
    ProjectModel.deleteMany({}),
  ]);
  console.log(colors.yellow("⚠ Collections cleaned"));
}

// Run
main().catch(async (err) => {
  console.error(colors.red(err.stack || err.message));
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
