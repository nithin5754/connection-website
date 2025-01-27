import express from "express";
import { loginUser, logout, seed, signUp } from "../controller/auth.controller.js";

const router = express.Router();

function authRoutes() {
  router.post("/signup", signUp);
  router.post("/login", loginUser);
  router.post('/logout',logout)
  router.get("/seed", seed);

  return router;
}

export default authRoutes;
