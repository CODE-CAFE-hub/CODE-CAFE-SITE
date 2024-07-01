import { Request, Response } from "express";
import User from "../Authmodels/user.models";
import jwt from "jsonwebtoken";
import { SendGreetingEmail, SendPassResetEmail } from "../../utils/SendEmail";
import { validationResult } from "express-validator";

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    await SendGreetingEmail(name, email);

    const token = user.generateAccessToken();
    res.cookie("token", token);
    res.status(201).json({ user });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login a user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.generateAccessToken();
    res.cookie("token", token);
    res.json({ user });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout a user
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "20m" }
    );
    await SendPassResetEmail(resetToken, email);

    res.json({ message: "Password reset token sent" });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reset password
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { token, id } = req.query;
  const { newPassword } = req.body;

  if (!token || !id || !newPassword) {
    return res.status(400).json({ message: "Invalid request parameters" });
  }

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as { id: string };

    if (decoded.id !== id) {
      return res.status(400).json({ message: "Invalid token or user ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; // Make sure you hash the password before saving
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
