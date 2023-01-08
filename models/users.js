import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: String,
  delinquent: Boolean,
  customerId: String,
  subscriptionId: String,
  subscriptionStatus: String,
  paid: Boolean,
  birthDate: Date,
  timeOfBirth: String,
  sign: String,
  birthLocation: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
