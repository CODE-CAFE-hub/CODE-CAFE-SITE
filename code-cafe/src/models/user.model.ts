import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define interface for User model
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose schema for User model
const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: [true, "Username is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      unique: true,
      lowercase: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "customer"],
      default: "customer",
      required: true,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(18);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Create and export Mongoose model
const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default UserModel;
