import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true, 
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.models.User || mongoose.model("User", UserSchema);
