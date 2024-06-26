import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Environment variables
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

// Validation schema using Zod
export const userValidationSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  role: z.enum(["visitor", "Owner"]).default("visitor"),
  rating: z.number().default(0),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

// Interface for IUser
export interface IUser extends Document {
  generateAccessToken(): string;
  generateRefreshToken(): string;
  username: string;
  password: string;
  email: string;
  role: string;
  rating: number;
  accessToken?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema definition
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false, // Set to true if you want unique emails
    },
    role: {
      type: String,
      enum: ["visitor", "Owner"],
      default: "visitor",
    },
    rating: {
      type: Number,
      default: 0,
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Encrypt password before saving
userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (err: any) {
    return next(err);
  }
});

// Method to validate password
userSchema.methods.isValidPassword = async function (password: string) {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      role: this.role,
    },
    ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "1d",
    }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET!
  );
};

// Create and export the User model
export const User = model<IUser>("User", userSchema);
