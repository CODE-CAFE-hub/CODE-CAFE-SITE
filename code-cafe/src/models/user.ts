// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  password?: string; // Make password optional
  profilePicture?: string;
  displayName?: string;
  dob?: Date;
  lastLogin?: Date;
  mediaLinks?: {
    [key: string]: string;
  };
  timezone?: string;
  rating?: {
    average: number;
    count: number;
  };
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePicture: { type: String },
  displayName: { type: String },
  dob: { type: Date },
  lastLogin: { type: Date },
  mediaLinks: { type: Map, of: String },
  timezone: { type: String },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
