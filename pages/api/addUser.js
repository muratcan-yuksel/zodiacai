import clientPromise from "../../lib/mongodb";
export default async function createUser(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");
  const { name, email, customerId } = req.body;
  //these will be taken from the webhooks
  try {
    const user = await collection.insertOne({
      name,
      email,
      customerId,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
}
