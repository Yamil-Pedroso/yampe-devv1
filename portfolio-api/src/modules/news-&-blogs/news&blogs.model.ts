import { Schema, model, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: { url: string; alt?: string };
  tags: string[];
  author?: string;
  publishedAt?: Date;
  status: "draft" | "published";
  iconKey?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
  createdAt?: Date;
  updatedAt?: Date;
}

const CoverImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    coverImage: { type: CoverImageSchema },
    tags: { type: [String], default: [], index: true },
    author: { type: String },
    publishedAt: { type: Date, index: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
    iconKey: { type: String },
    seo: {
      metaTitle: String,
      metaDescription: String,
      ogImage: String,
    },
  },
  { timestamps: true }
);

BlogPostSchema.index({ status: 1, publishedAt: -1, slug: 1 });

export const BlogPostModel = model<IBlogPost>("blog_posts", BlogPostSchema);

// Settings (solo header u otras opciones del módulo)
export interface IBlogSettings extends Document {
  header: string; // "News & Blogs"
  status: "draft" | "published";
}

const BlogSettingsSchema = new Schema<IBlogSettings>(
  {
    header: { type: String, default: "News & Blogs" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export const BlogSettingsModel = model<IBlogSettings>(
  "blog_settings",
  BlogSettingsSchema
);
