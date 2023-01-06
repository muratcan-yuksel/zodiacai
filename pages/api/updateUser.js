import clientPromise from "../../lib/mongodb";

export default async function updateUser(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");
  const { customerId, subscriptionId, subscriptionStatus } = req.body;
  //these will be taken from the webhooks
  try {
    const user = await collection.updateOne(
      { customerId: customerId },
      {
        $set: {
          subscriptionId: subscriptionId,
          subscriptionStatus: subscriptionStatus,
        },
      }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
}
