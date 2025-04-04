

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { paymentCreate, verifyPayment } from "../controller/payment.controller.js";

const router = express.Router();

function paymentRoutes() {
  router.post("/payment/create", authMiddleware, paymentCreate);
  router.post("/payment/webhook", authMiddleware, verifyPayment);

  return router;
}

export default paymentRoutes;
