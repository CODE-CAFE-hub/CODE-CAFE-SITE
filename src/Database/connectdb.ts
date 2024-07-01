import mongoose from "mongoose"; // Import the mongoose library

// Asynchronous function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    // Check if the MONGO_URI environment variable is defined
    if (!process.env.MONGO_URI) {
      // Throw an error if MONGO_URI is not defined
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Attempt to connect to the MongoDB database using the MONGO_URI
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      // Example of supported options
      serverSelectionTimeoutMS: 5000, // Wait for 5 seconds before timing out
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    // Log a success message with the host name if the connection is successful
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    // console.log(connection);
  } catch (error: any) {
    // Log an error message if the connection fails
    console.error(`Error: ${error.message}`);
    // Exit the process with failure code
    process.exit(1);
  }
};
