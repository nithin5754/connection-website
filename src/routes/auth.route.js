import express from "express";
import { loginUser, logout, seed, signUp, testApi } from "../controller/auth.controller.js";

const router = express.Router();

function authRoutes() {
  router.post("/signup", signUp);
  router.post("/login", loginUser);
  router.post('/logout',logout)
  router.get("/seed", seed);
  router.get('/test',testApi)

  return router;
}

export default authRoutes;
