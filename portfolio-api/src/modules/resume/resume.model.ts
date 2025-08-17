import { Schema, model, Document } from "mongoose";

export interface IResumeExperience {
  jobTitle: string;
  company: string;
  year?: string;
  startYear?: number;
  endYear?: number | null;
  iconKey?: string;
  order?: number;
}

export interface IResume extends Document {
  header: string;
  title: string;
  experience: IResumeExperience[];
  skills: string[];
  status: "draft" | "published";
  updatedAt?: Date;
  createdAt?: Date;
}

const ResumeExperienceSchema = new Schema<IResumeExperience>(
  {
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    year: { type: String },
    startYear: { type: Number },
    endYear: { type: Number },
    iconKey: { type: String },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const ResumeSchema = new Schema<IResume>(
  {
    header: { type: String, required: true },
    title: { type: String, required: true },
    experience: { type: [ResumeExperienceSchema], default: [] },
    skills: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
  },
  { timestamps: true }
);

export const ResumeModel = model<IResume>("resumes", ResumeSchema);
