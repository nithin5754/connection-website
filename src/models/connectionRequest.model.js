import mongoose from "mongoose";


const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }

)

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });


connectionRequestSchema.pre('save',function (next) {
  if(this.toUserId.toString()===this.fromUserId.toString()){
    throw new Error("invalid cannot send same connection");
    
  }
  next()
})
 


const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
)

export default ConnectionRequestModel