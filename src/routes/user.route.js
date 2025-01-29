import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { connectionRequest, connections, feed } from "../controller/user.controller.js";

const router = express.Router();

function userRoutes() {
  router.get("/user/connections",authMiddleware, connections);
  router.get('/feed',authMiddleware,feed)
  router.get("/user/requests/received",authMiddleware,connectionRequest)
  return router;
}

export default userRoutes;
