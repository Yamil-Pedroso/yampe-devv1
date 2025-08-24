import { Schema, model, Document } from "mongoose";

export type ProjectCategory =
  | "Web Development"
  | "Mobile Apps"
  | "UI/UX Design"
  | "Mini Apps"
  | "Graphic Design";

export type ProjectTag =
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwindcss"
  | "styled-components"
  | "framer-motion"
  | "threejs"
  | "r3f"
  | "gsap"
  | "node"
  | "express"
  | "mongodb"
  | "supabase"
  | "crud"
  | "animation"
  | "scroll";

export interface IProject extends Document {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageDetails?: string[];
  iconKey?: string;
  link?: string;
  tags?: ProjectTag[];
  category?: ProjectCategory;
  status: "draft" | "published";
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const allowedTags: ProjectTag[] = [
  "react",
  "nextjs",
  "typescript",
  "tailwindcss",
  "styled-components",
  "framer-motion",
  "threejs",
  "r3f",
  "gsap",
  "node",
  "express",
  "mongodb",
  "supabase",
  "crud",
  "animation",
  "scroll",
];

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String },
    imageDetails: [{ type: String }],
    iconKey: { type: String },
    link: { type: String },
    tags: {
      type: [String],
      validate: [
        {
          validator: (arr: string[]) => (arr ?? []).length <= 5,
          message: "Máximo 5 tags por proyecto",
        },
        {
          validator: (arr: string[]) =>
            (arr ?? []).every((t) => allowedTags.includes(t as ProjectTag)),
          message: "Uno o más tags no están permitidos",
        },
      ],
      default: [],
      index: true,
    },
    category: {
      type: String,
      enum: [
        "Web Development",
        "Mobile Apps",
        "UI/UX Design",
        "Creative Coding",
        "Graphic Design",
      ],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ status: 1, order: 1 });

export const ProjectModel = model<IProject>("projects", ProjectSchema);

export interface IProjectsSettings extends Document {
  header: string;
  status: "draft" | "published";
}

const ProjectsSettingsSchema = new Schema<IProjectsSettings>(
  {
    header: { type: String, default: "My Works" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export const ProjectsSettingsModel = model<IProjectsSettings>(
  "projects_settings",
  ProjectsSettingsSchema
);
