import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const dbConnect = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.info("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGOOSE_URI as string, {
      dbName: "dribbble-clone",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    isConnected = true;
    console.info("MongoDB is now connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("MongoDB connection failed");
  }
};

