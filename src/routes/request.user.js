
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { sendRequest } from "../controller/request.controller.js";

const router = express.Router();

function requestRoutes() {
  router.post("/request/:status/:toUserId",authMiddleware, sendRequest);

  return router;
}

export default requestRoutes;
