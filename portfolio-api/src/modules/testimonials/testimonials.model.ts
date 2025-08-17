import { Schema, model, Document } from "mongoose";

export interface ITestimonial extends Document {
  avatar?: string; // /images/testimonials/avatar_1.jpg
  quote: string; // texto del testimonio
  author: string; // "Claudia Calderone"
  position?: string; // "Product Designer"
  iconKey?: string; // "quoteLeft"
  rating?: number; // opcional 1-5
  lang?: string; // opcional: "de" | "en" | "es"
  status: "pending" | "approved" | "rejected";
  order?: number; // para ordenar manualmente en home
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    avatar: { type: String },
    quote: { type: String, required: true },
    author: { type: String, required: true },
    position: { type: String },
    iconKey: { type: String }, // mapearás a FaQuoteLeft en el front
    rating: { type: Number, min: 1, max: 5 },
    lang: { type: String, default: "en" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
      index: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TestimonialSchema.index({ status: 1, order: 1 });

export const TestimonialModel = model<ITestimonial>(
  "testimonials",
  TestimonialSchema
);

// Settings (header y description del bloque)
export interface ITestimonialsSettings extends Document {
  header: string;
  description?: string;
  status: "draft" | "published";
}

const TestimonialsSettingsSchema = new Schema<ITestimonialsSettings>(
  {
    header: { type: String, default: "Testimonials" },
    description: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export const TestimonialsSettingsModel = model<ITestimonialsSettings>(
  "testimonials_settings",
  TestimonialsSettingsSchema
);
