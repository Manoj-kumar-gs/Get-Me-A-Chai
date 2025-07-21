import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  coverPic: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  razorpayKeyId: {
  type: String,
},
razorpaySecret: {
  type: String,
},

}, { timestamps: true });

export default mongoose.models.User || model("User", userSchema);
