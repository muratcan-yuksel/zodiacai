import clientPromise from "../../lib/mongodb";

export default async function createUser(req, res) {
  console.log("I have been called for the database");
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");
  const {
    name,
    email,
    // customerId,
    // createdAt,
    // delinquent,
    birthDate,
    timeOfBirth,
    sign,
    birthLocation,
    //paypal ones
    orderID,
    subscriptionID,
    paymentSource,
    facilitatorAccessToken,
  } = req.body;
  //these will be taken from the webhooks
  try {
    const user = await collection.insertOne({
      name,
      email,
      // customerId,
      // createdAt,
      // delinquent,
      birthDate,
      timeOfBirth,
      sign,
      birthLocation,
      //paypal ones
      orderID,
      subscriptionID,
      paymentSource,
      facilitatorAccessToken,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
}
