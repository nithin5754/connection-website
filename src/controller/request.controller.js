import ConnectionRequestModel from "../models/connectionRequest.model.js";
/**
 * send request and ignored to connection users from the authenticated user.
 * Assumes `req.user` contains the authenticated user data, typically set by an authentication middleware.
 * Endpoint - POST /request/:status/:userId Api
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.user - Authenticated user details populated by middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Sends a JSON response with user details or passes an error to the next middleware.
 */


const sendRequest = async (req, res, next) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    if (!fromUserId || !toUserId || !status) {
      throw new Error("credentials missing");
    }

    await ConnectionRequestModel.create({ fromUserId, toUserId, status });

    res.status(200).json({ message: "new request connection send successfully!" });
  } catch (error) {
    next(error);
  }
};

export { sendRequest };
