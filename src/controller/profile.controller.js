/**
 * Retrieves the details of the authenticated user.
 * Assumes `req.user` contains the authenticated user data, typically set by an authentication middleware.
 * Endpoint - GET /profile/view Api
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.user - Authenticated user details populated by middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Sends a JSON response with user details or passes an error to the next middleware.
 */

import userModel from "../models/user.model.js";
import { validateEditProfileData } from "../utils/validation.js";

const profileView = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("user not found");
    }

    res.status(200).json({ message: "user details", user });
  } catch (error) {
    next(error);
  }
};


const profileEdit=async(req,res,next)=>{

  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
   

   

    // Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body))

    // await loggedInUser.save()

    const isUpdate=await userModel.findOneAndUpdate({_id:req.user._id},{$set:req.body},{new: true})

    res.json({
      message: `${isUpdate.firstName}, your profile updated successfuly`,
    data:isUpdate
    });
  } catch (error) {
    next(error)
  }
}

export { profileView ,profileEdit};
