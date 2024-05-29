import mongoose, { Document, Model, Schema } from "mongoose";

interface IMessage extends Document {
  content: string;
  ownerId: string;
  userId: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  content: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
