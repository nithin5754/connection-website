
import express from "express";
import connectDB from "./config/database.js";  
import authRoutes from "./routes/auth.route.js";
import ErrorHandlingMiddleWare from "./middleware/error-handdling.js";


const app = express();

app.use(express.json());

app.use('/',authRoutes())

app.use(ErrorHandlingMiddleWare)

connectDB()
  .then(() => {console.log("MongoDB connected successfully")
    
    app.listen(3000, () => console.log("server started"))
  })
  .catch((err) => console.error("MongoDB connection error:", err));





