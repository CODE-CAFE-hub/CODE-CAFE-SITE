import { login, register, logout } from "../controllers/authController";
import { authenticate } from "../../middleware/authMiddleware";

export const authRoutes = (app: any) => {
  app.post("/api/login", login);
  app.post("/api/register", register);
  app.get("/api/logout", authenticate, logout); // Apply authenticate middleware to logout route
};
