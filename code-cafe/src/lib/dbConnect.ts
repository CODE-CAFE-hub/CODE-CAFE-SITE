import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;

    console.log(`\n${db}\n ${db.connections}\n`);

    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1); // Exit process with failure
  }
}

export default dbConnect;
