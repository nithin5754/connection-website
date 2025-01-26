import userModel from "../models/user.model.js";
import { fakerProfiles } from "../utils/faker.js";
import bcrypt from "bcrypt";
import { validateLogin, validateSignUpData } from "../utils/validation.js";
import { userSanitize } from "../utils/sanitize.js";

/**
 * Handles user SIGNUP.
 * Checks if the user already exists in the database.
 * Hashes the user's password using the bcrypt library before saving to the database
 * Hashing helper function in User schema
 * Endpoint POST /signup Api
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing user signup details.
 * @param {string} req.body.emailId - Email ID of the user.
 * @param {string} req.body.firstName - First name of the user.
 * @param {string} req.body.lastName - Last name of the user.
 * @param {string} req.body.password - Password of the user (to be hashed).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Sends response or passes error to the next middleware.
 */

const signUp = async (req, res, next) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const isFind = await userModel.findOne({ emailId });
    if (isFind) {
      throw new Error("user found");
    }

    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password,
    });
    await user.save();

    res
      .status(201)
      .json({ message: "User Added successfully!", data: userSanitize(user) });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user LOGIN by validating credentials and generating a JWT token.
 * Password compare using bcrypt.compare()
 * Sets the JWT token in an HTTP-only cookie.
 * Endpoint POST /login Api
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing user login credentials.
 * @param {string} req.body.emailId - Email ID of the user.
 * @param {string} req.body.password - Password of the user.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Sends response or passes error to the next middleware.
 */

const loginUser = async (req, res, next) => {
  try {
    validateLogin(req);

    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.verifyPass(password)

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = await user.getJWT();

    res.cookie("jwt", token);
    res.status(200).json({ message: "User login" });
  } catch (error) {
    next(error);
  }
};


const seed = async (_req, res) => {
  let data = fakerProfiles();

  for (let i = 0; i < data.length; i++) {
    await userModel.create(data[i]);
  }

  res.send("create seeds");
};

export { signUp, seed, loginUser };
