import { Schema, model, Document } from "mongoose";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "databases"
  | "design"
  | "devops"
  | "architecture";

export interface ISkill extends Document {
  category: SkillCategory;
  tech: string;
  level: number; // 0-100
  icon?: string; // ruta a la imagen
  status: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    category: {
      type: String,
      enum: [
        "frontend",
        "backend",
        "databases",
        "design",
        "devops",
        "architecture",
      ],
      required: true,
    },
    tech: { type: String, required: true, trim: true },
    level: { type: Number, min: 0, max: 100, required: true },
    icon: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

SkillSchema.index({ category: 1, status: 1 });

export const SkillModel = model<ISkill>("skills", SkillSchema);

export interface ISkillsSettings extends Document {
  header: string;
  description?: string;
  status: "draft" | "published";
}

const SkillsSettingsSchema = new Schema<ISkillsSettings>(
  {
    header: { type: String, default: "My Skills" },
    description: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export const SkillsSettingsModel = model<ISkillsSettings>(
  "skills_settings",
  SkillsSettingsSchema
);
