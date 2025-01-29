import mongoose from "mongoose";
import ConnectionRequestModel from "../models/connectionRequest.model.js";
import { connectionRequestValidation } from "../utils/validation.js";
/**
 * send request and ignored to connection users from the authenticated user.
 * Assumes `req.user` contains the authenticated user data, typically set by an authentication middleware.
 * Endpoint - POST /request/:status/:userId Api
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.user - Authenticated user details populated by middleware.
 * @param {Object} req.params - toUserId,status either Interested || Ignored .
 * @param {Object} res - Express response object .
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Sends a JSON response with user details or passes an error to the next middleware.
 */

const sendRequest = async (req, res, next) => {

  try {
    connectionRequestValidation(req);


    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    if (!fromUserId) {
      throw new Error("credentials missing");
    }

    const isRequestExist = await ConnectionRequestModel.find({
      $or: [
        {
          $and: [
            { fromUserId: new mongoose.Types.ObjectId(fromUserId) },
            { toUserId: new mongoose.Types.ObjectId(toUserId) },
          ],
        },

        {
          $and: [
            { fromUserId: new mongoose.Types.ObjectId(toUserId) },
            { toUserId: new mongoose.Types.ObjectId(fromUserId) },
          ],
        },
      ],
    });

    if (isRequestExist && isRequestExist.length > 0) {
      throw new Error("found duplicate");
    }

    await ConnectionRequestModel.create({ fromUserId, toUserId, status });

    res
      .status(200)
      .json({ message: "new request connection send successfully!" });
  } catch (error) {
    next(error);
  }
};

const reviewRequest =async(req,res,next)=>{
  try {

    const loggedInUser = req.user;
    const { status, requestId } = req.params;


    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ messaage: "Status not allowed!" });
    }

    
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res
        .status(404)
        .json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;
    
    const data = await connectionRequest.save();

    
    res.json({ message: "Connection request " + status, data });
    
  } catch (error) {
    next(error)
  }
}

export { sendRequest ,reviewRequest };
