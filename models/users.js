import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: String,
  delinquent: Boolean,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
