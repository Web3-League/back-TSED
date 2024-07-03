import { connect } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI: string = process.env.MONGO_URI || "";
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in the environment variables.");
    }

    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${(err as Error).message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;


