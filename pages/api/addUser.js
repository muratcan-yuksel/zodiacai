import clientPromise from "../../lib/mongodb";
const User = require("../../models/users");

export default async function createUser(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");

  try {
    const user = await collection.insertOne({
      name: "John",
      email: " adsf@asdf.com",
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
}
