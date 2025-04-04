import express from "express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import ErrorHandlingMiddleWare from "./middleware/error-handdling.js";
import cookieParser from "cookie-parser";
import profileRoutes from "./routes/profile.route.js";
import userRoutes from "./routes/user.route.js";
import requestRoutes from "./routes/request.user.js";
import cors from "cors";
import "./utils/cronjob.js";
import paymentRoutes from "./routes/payment.route.js";
const port = process.env.PORT || 3000;

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
app.use("/", requestRoutes());
app.use("/", paymentRoutes());

app.use(ErrorHandlingMiddleWare);

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(port, () => console.log("server started"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
