import mongoose, { Schema, Document, Model } from "mongoose";

interface IProject extends Document {
  title: string;
  description: string;
  pictureUrls: string[];
  tags: string[];
  views: number;
  incrementViews: () => Promise<void>;
}

const projectSchema: Schema<IProject> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pictureUrls: [{ type: String }],
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
});

projectSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};

const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
