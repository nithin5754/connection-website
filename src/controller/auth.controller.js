import userModel from "../models/user.model.js";
import { fakerProfiles } from "../utils/faker.js";
import bcrypt from "bcrypt";
import { validateLogin, validateSignUpData } from "../utils/validation.js";

import jwt from 'jsonwebtoken'

import { userSanitize } from "../utils/sanitize.js";

const signUp = async (req, res, next) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();

    res
      .status(201)
      .json({ message: "User Added successfully!", data: userSanitize(user) });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    validateLogin(req);

    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
 const token=await jwt.sign({id:user._id},process.env.JWT_TOKEN)

    res.cookie("jwt",token);
    res.status(200).json({ message: "User login" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {


 
    const user = await userModel.findOne({ _id:req.userId });

    res.status(200).json({ message: "created", user });
  } catch (error) {
    next(error);
  }
};

const seed = async (req, res) => {
  let data = fakerProfiles();

  for (let i = 0; i < data.length; i++) {
    await userModel.create(data[i]);
  }

  res.send("create seeds");
};

export { signUp, getUser, seed, loginUser };
