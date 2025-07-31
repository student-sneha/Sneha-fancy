import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ DB connected to:", mongoose.connection.name);
  });

  await mongoose.connect(process.env.MONGODB_URL);
};

export default connectDB;
