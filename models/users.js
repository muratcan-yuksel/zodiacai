import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // createdAt: String,
  // delinquent: Boolean,
  // customerId: String,
  // subscriptionId: String,
  // subscriptionStatus: String,
  // paid: Boolean,
  birthDate: Date,
  timeOfBirth: String,
  sign: String,        2023 Zodiac AI. All rights reserved.

  birthLocation: String,
  //paypal ones
  orderID: String,
  subscriptionID: String,
  paymentSource: String,
  facilitatorAccessToken: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
