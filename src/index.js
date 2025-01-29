import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import ErrorHandlingMiddleWare from "./middleware/error-handdling.js";
import cookieParser from "cookie-parser";
import profileRoutes from "./routes/profile.route.js";
import userRoutes from "./routes/user.route.js";
import requestRoutes from "./routes/request.user.js";
import cors from 'cors'

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRoutes());
app.use("/", profileRoutes());
app.use("/", userRoutes());
app.use("/",requestRoutes())

app.use(ErrorHandlingMiddleWare);

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(3000, () => console.log("server started"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
