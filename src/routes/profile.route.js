import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { profileView } from "../controller/profile.controller.js";

const router = express.Router();

function profileRoutes() {
  router.get("/profile/view", authMiddleware, profileView);

  return router;
}

export default profileRoutes;
