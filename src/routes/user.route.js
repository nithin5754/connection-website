import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { connections } from "../controller/user.controller.js";

const router = express.Router();

function userRoutes() {
  router.get("/user/connections",authMiddleware, connections);

  return router;
}

export default userRoutes;
