import jwtToken from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function authMiddleware(req, _res, next) {
  try {
    const { jwt } = req.cookies;
    const decoded = await jwtToken.verify(jwt, process.env.JWT_TOKEN);
    if (!decoded || !decoded.id) {
      throw new Error("token is not valid");
    }
    const user = await userModel.findById(decoded.id);
    if (!user || !user._id) {
      throw new Error("not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next("token invalid", error.message);
  }
}
