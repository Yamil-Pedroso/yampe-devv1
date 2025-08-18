import { Schema, model, Document } from "mongoose";

export interface IService extends Document {
  slug: string;
  stepNumber?: string;
  title: string;
  description?: string;
  iconKey?: string; // ej: "arrowOutward"
  status: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    stepNumber: { type: String },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    iconKey: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

ServiceSchema.index({ status: 1, title: 1 });

export const ServiceModel = model<IService>("services", ServiceSchema);

// Settings (para el header "Our Services")
export interface IServiceSettings extends Document {
  header: string;
  status: "draft" | "published";
}

const ServiceSettingsSchema = new Schema<IServiceSettings>(
  {
    header: { type: String, default: "My Services" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export const ServiceSettingsModel = model<IServiceSettings>(
  "service_settings",
  ServiceSettingsSchema
);
