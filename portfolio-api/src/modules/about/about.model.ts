import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  header: string;
  title: string;
  description: string;
  features: { text: string; icon?: string }[];
  image: string;
  infoContact: { text1: string; text2: string; icon?: string }[];
  roleTags: { text: string; icon?: string }[];
}

const AboutSchema: Schema = new Schema({
  header: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ text: String, icon: String }],
  image: { type: String },
  infoContact: [{ text1: String, text2: String, icon: String }],
  roleTags: [{ text: String, icon: String }],
});

export default mongoose.model<IAbout>("About", AboutSchema);
