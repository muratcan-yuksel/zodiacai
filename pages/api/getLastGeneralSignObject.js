import clientPromise from "../../lib/mongodb";
const cors = require("cors");

// const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

export default async function getLastGeneralSignObject(req, res) {
  cors({
    origin: true,
    credentials: true,
  })(req, res, async () => {
    try {
      const client = await clientPromise;
      const db = client.db("zodiacai");
      const collection = db.collection("generalSigns");
      const lastItem = await collection
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();
      res.status(200).json(lastItem[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
}
