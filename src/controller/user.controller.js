import ConnectionRequestModel from "../models/connectionRequest.model.js";
import userModel from "../models/user.model.js";

/**
 * receive all the connection users after current user authenticated.
 * Assumes `req.user` contains the authenticated user data, typically set by an authentication middleware.
 * Endpoint GET /connections Api
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.user - Authenticated user details populated by middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Sends response array of connection list  or [].
 */
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

const connections = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })  .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

      
    res.status(200).json({ message: "Connection request send!" ,data });
  } catch (error) {
    next(error);
  }
};

const connectionRequest = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

  

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);



    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    next(error);
  }
};


const feed = async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });


    const users = await userModel.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);


      res.json({
        message: "Data fetched successfully",
        data: users,
      });

  } catch (error) {
    next(error);
  }
};






export {connections,connectionRequest,feed}