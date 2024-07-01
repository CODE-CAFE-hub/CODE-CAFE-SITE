import express from "express"; // Import the express library
import cors from "cors"; // Import the cors library
import helmet from "helmet"; // Import helmet for security
import compression from "compression"; // Import compression for performance
import { connectDB } from "./Database/connectdb"; // Import the database connection function
import morgan from "morgan"; // Import morgan for logging
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import authRoutes from "./Auth/AuthRoutes/auth.routes"; // Import the auth routes

// Load environment variables from .env file
dotenv.config();

// Create an instance of the express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Middleware to enhance security
app.use(helmet());

// Middleware to compress responses
app.use(compression());

// Middleware to log HTTP requests
app.use(morgan("combined"));

//routes
app.use("/api/auth", authRoutes);

// Environment variable for the port, default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and connect to the database
app.listen(PORT, async () => {
  // Connect to the database
  await connectDB();
  // Log a message indicating that the server is running
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for testing or further use
export default app;
