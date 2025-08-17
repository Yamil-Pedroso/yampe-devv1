import { Schema, model, Document } from "mongoose";

export interface IWork extends Document {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  iconKey?: string;
  link?: string;
  tags?: string[];
  status: "draft" | "published";
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const WorkSchema = new Schema<IWork>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String },
    iconKey: { type: String },
    link: { type: String },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

WorkSchema.index({ status: 1, order: 1 });

export const WorkModel = model<IWork>("works", WorkSchema);

export interface IWorksSettings extends Document {
  header: string;
  status: "draft" | "published";
}

const WorksSettingsSchema = new Schema<IWorksSettings>(
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

export const WorksSettingsModel = model<IWorksSettings>(
  "works_settings",
  WorksSettingsSchema
);
