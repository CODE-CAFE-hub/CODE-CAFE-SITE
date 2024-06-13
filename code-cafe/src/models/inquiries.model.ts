import mongoose, { Schema, Document } from "mongoose";

// Define interface for Inquiry model
interface IInquiry extends Document {
    userId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    subject: string;
    message: string;
    status: 'open' | 'closed';
    createdAt: Date;
    updatedAt: Date;
}

// Define Mongoose schema for Inquiry model
const InquirySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export Mongoose model
const InquiryModel = (mongoose.models.Inquiry as mongoose.Model<IInquiry>)||(mongoose.model<IInquiry>('Inquiry', InquirySchema))

export default InquiryModel;
