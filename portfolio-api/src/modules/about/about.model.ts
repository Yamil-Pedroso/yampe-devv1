import mongoose, { Schema, Document } from "mongoose";

export interface IAboutFeature {
  text: string;
  icon?: string;
}

export interface IAboutContact {
  text1: string; // mantiene text1
  text2: string; // mantiene text2
  icon?: string; // mantiene icon
}

export interface IAboutRoleTag {
  text: string;
  icon?: string;
}

export interface IAbout extends Document {
  header: string;
  title: string;
  description: string;
  features: IAboutFeature[];
  image?: string; // en tu data es un string, no un objeto
  infoContact: IAboutContact[];
  roleTags: IAboutRoleTag[];
  status?: "draft" | "published";
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
}

const AboutFeatureSchema = new Schema<IAboutFeature>(
  {
    text: { type: String, required: true },
    icon: { type: String },
  },
  { _id: false }
);

const AboutContactSchema = new Schema<IAboutContact>(
  {
    text1: { type: String, required: true },
    text2: { type: String, required: true },
    icon: { type: String },
  },
  { _id: false }
);

const AboutRoleTagSchema = new Schema<IAboutRoleTag>(
  {
    text: { type: String, required: true },
    icon: { type: String },
  },
  { _id: false }
);

const AboutSchema = new Schema<IAbout>(
  {
    header: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

    features: { type: [AboutFeatureSchema], default: [] },
    image: { type: String }, // string como en tu data
    infoContact: { type: [AboutContactSchema], default: [] },
    roleTags: { type: [AboutRoleTagSchema], default: [] },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      ogImage: String,
    },
  },
  { timestamps: true }
);

const AboutModel = mongoose.model<IAbout>("About", AboutSchema);
export default AboutModel;
