import mongoose, { Schema, Document } from "mongoose";

// Define interface for Project model
interface IProject extends Document {
  ownerId: mongoose.Types.ObjectId;
  star: number;
  name: string;
  status: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose schema for Project model
const ProjectSchema: Schema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["complete", "inProgress"],
      default: "inProgress",
    },
    star: { type: Number, default: 0 },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create and export Mongoose model
const ProjectModel =
  (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
