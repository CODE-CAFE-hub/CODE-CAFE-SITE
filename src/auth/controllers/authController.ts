import type { Request, Response } from "express";
import { User, type IUser } from "../models/User";
import bcrypt from "bcrypt";
import { userValidationSchema } from "../models/User"; // Assuming userValidationSchema is defined in a separate file
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    // Validate input data
    const { username, password, email } = req.body;
    userValidationSchema.parse({ username, password, email });

    // Check if user with the same username or email already exists
    let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser: IUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Generate tokens
    const accessToken = jwt.sign(
      { _id: newUser._id, username: newUser.username, role: newUser.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { _id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET!
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // Return the created user (excluding sensitive fields)
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      rating: newUser.rating,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate input data
    const { username, password } = req.body;
    userValidationSchema.parse({ username, password });

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET!
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // Return the user (excluding sensitive fields)
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      rating: user.rating,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User is not logged in." });
    }
    // Clear cookies
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
