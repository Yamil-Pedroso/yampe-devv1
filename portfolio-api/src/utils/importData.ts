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
import { WorkModel, WorksSettingsModel } from "../modules/works/works.model";

import { aboutMeData } from "../data/aboutData";
import { servicesData } from "../data/servicesData";
import { skillsData } from "../data/skillsData";
import { testimonialsData } from "../data/testimonialsData";
import { worksData } from "../data/worksData";

dotenv.config({ path: path.resolve(__dirname, "..", "config", "config.env") });

// --- helpers ---
colors.enable();

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
    works: seedWorks,
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

// ABOUT: un único documento, mapeando TODAS las props del modelo //
// ================== SEEDERS ==================
async function seedAbout() {
  const payload = {
    header: aboutMeData.header,
    title: aboutMeData.title,
    description: aboutMeData.description,
    status: "published",

    // image es STRING en tu modelo
    image: typeof aboutMeData.image === "string" ? aboutMeData.image : "",

    // features usa 'icon' (no iconKey) según tu schema
    features: (aboutMeData.features ?? []).map((f) => ({
      text: f.text,
      icon: typeof f.icon === "string" ? f.icon : undefined,
    })),

    // infoContact usa text1/text2/icon según tu schema
    infoContact: (aboutMeData.infoContact ?? []).map((c) => ({
      text1: c.text1,
      text2: (c.text2 ?? "").toString().trim(),
      icon: typeof c.icon === "string" ? c.icon : undefined,
    })),

    // roleTags ya coincide (text, icon)
    roleTags: (aboutMeData.roleTags ?? []).map((r) => ({
      text: r.text,
      icon: r.icon,
    })),

    // opcional: tu schema permite seo (todas strings)
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

  // 2) Items -> normaliza y añade slug
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

  // 3) Upsert por slug (eficiente con bulkWrite)
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

// SKILLS: settings + items (cada skill es un doc con category)
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

  // Convierte el objeto categorizado a un array plano
  const groups = skillsData.skills as Record<
    string,
    Array<{ tech: string; level: number; icon?: string }>
  >;
  const entries = Object.entries(groups).flatMap(([category, arr]) =>
    (arr ?? []).map((s) => ({
      category, // debe coincidir con el enum del modelo: "frontend" | "backend" | ...
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

// WORKS: settings + items
async function seedWorks() {
  if (!worksData) return;

  await WorksSettingsModel.findOneAndUpdate(
    {},
    { header: worksData.header, status: "published" },
    { upsert: true, new: true }
  );

  const items = (worksData.projects ?? []).map((p: any, i: number) => ({
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    image: p.image,
    iconKey: "arrowOutward",
    status: "published",
    order: i + 1,
  }));

  for (const it of items) {
    await WorkModel.findOneAndUpdate(
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
    WorksSettingsModel.deleteMany({}),
    WorkModel.deleteMany({}),
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
