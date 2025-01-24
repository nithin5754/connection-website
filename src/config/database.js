import mongoose from 'mongoose';
import { configDotenv } from "dotenv";
configDotenv();

async function connectDB() {
  const connect = await mongoose.connect(process.env.MONGO_URI);

  return connect;
}

export default connectDB
