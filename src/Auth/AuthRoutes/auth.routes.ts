import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../Authcontrollers/controllers";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
