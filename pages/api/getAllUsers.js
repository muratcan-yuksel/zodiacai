import clientPromise from "../../lib/mongodb";

export default async function updateUser(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");
  try {
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
}
