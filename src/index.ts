import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import { authRoutes } from "./auth/routes/authRoutes";
import connectDB from "./config/dbConfig";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Security headers
app.use(morgan("combined")); // Request logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Adjust as needed
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Apply authentication routes
authRoutes(app);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}

  Open the browser and navigate to http://localhost:${PORT}
  `);

  connectDB().catch((err) => console.error("MongoDB connection error:", err));

  // Add additional server initialization code here
});
