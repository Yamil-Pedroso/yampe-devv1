import { Schema, model, Types, HydratedDocument } from "mongoose";

export interface INotification {
  _id: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationDoc = HydratedDocument<INotification>;

const NotificationSchema = new Schema<INotification>(
  {
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Notification = model<INotification>(
  "Notification",
  NotificationSchema
);
