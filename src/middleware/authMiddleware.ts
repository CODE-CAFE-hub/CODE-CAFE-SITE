import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.user = decoded; // Store the decoded user information in the request object
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Invalid or expired token, please log in again." });
  }
};
