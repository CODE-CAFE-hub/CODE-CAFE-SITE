import mongoose, { Document, Model, Schema } from "mongoose";

interface IVisit extends Document {
  ip: string;
  timestamp: Date;
}

const VisitSchema: Schema = new Schema({
  ip: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

const Visit: Model<IVisit> =
  mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema);
export default Visit;
