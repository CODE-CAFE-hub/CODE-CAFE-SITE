import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a type for the authenticated request
interface AuthenticatedRequest extends Request {
  currentUser?: any; // Adjust this based on your user structure
}

export const AuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.currentUser = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
