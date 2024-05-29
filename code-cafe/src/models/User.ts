import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  name?: string;
  lastLogin?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  lastLogin: { type: Date },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
