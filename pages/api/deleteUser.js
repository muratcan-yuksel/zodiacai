import clientPromise from "../../lib/mongodb";
export default async function deleteUser(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");
  const { customerId } = req.body;
  try {
    const user = await collection.deleteOne({
      customerId,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
}
