import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { profileEdit, profileView } from "../controller/profile.controller.js";

const router = express.Router();

function profileRoutes() {
  router.get("/profile/view", authMiddleware, profileView);
  router.patch("/profile/edit", authMiddleware, profileEdit);


  return router;
}

export default profileRoutes;
