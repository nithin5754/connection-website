import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  reviewRequest,
  sendRequest,
} from "../controller/request.controller.js";

const router = express.Router();

function requestRoutes() {
  router.post("/request/send/:status/:toUserId", authMiddleware, sendRequest);
  router.post(
    "/request/review/:status/:requestId",
    authMiddleware,
    reviewRequest
  );

  return router;
}

export default requestRoutes;
