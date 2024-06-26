import mongoose from "mongoose";

const connectDB = async () => {
  const maxRetries = 5; // Number of retry attempts
  let attempts = 0;

  const connect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI!);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
      attempts += 1;
      console.error(`Error: ${error.message}`);
      console.error(`Stack: ${error.stack}`);

      if (attempts < maxRetries) {
        console.log(`Retrying to connect... (${attempts}/${maxRetries})`);
        setTimeout(connect, 5000); // Retry after 5 seconds
      } else {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
    }
  };

  await connect();
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connection");
  await mongoose.connection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing MongoDB connection");
  await mongoose.connection.close();
  process.exit(0);
});

export default connectDB;
