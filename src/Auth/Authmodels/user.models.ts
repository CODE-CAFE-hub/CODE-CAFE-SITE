import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the IUser interface to describe the user document structure
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  rating: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
}

// Define the user schema with validation and default values
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email uniqueness
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    rating: { type: Number, default: 0 },
    image: { type: String },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Pre-save hook to hash the password before saving the user document
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (err: any) {
    next(err);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate a JWT for the user
userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d", // Token expiration time
  });
};

// Add an index to the email field for fast querying
userSchema.index({ email: 1 });

// Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
