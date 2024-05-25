import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";

// Ensure that MONGODB_URI is defined
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Cache for MongoDB connection
let cached = (global as any).mongoose;

// Initialize MongoDB connection
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to MongoDB
    cached.promise = mongoose
      .connect(MONGODB_URI, opts as any)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
