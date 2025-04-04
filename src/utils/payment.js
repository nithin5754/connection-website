
import Razorpay from 'razorpay'

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret:process.env.RAZORPAY_SECRET,
});

export default instance