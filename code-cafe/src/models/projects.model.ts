import mongoose, { Schema, Document } from "mongoose";

// Define interface for Project model
interface IProject extends Document {
  ownerId: mongoose.Types.ObjectId;
  images: string[];
  star: number;
  name: string;
  status: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    images: [{ type: String }],
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, maxlength: 100 }, // Example: Max length of 100 characters
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["complete", "inProgress"],
      default: "inProgress",
    },
    star: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create and export Mongoose model
const ProjectModel =
  (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
