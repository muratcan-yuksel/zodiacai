import clientPromise from "../../lib/mongodb";

import axios from "axios";

export default async function updateUser(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");

  try {
    const users = await collection.find({}).toArray();
    const horoscopes = await Promise.all(
      users.map(async (user) => {
        const { name, birthdate, sign } = user;
        const { data } = await axios.post(
          "http://localhost:3000/api/getUserHoroscopes",
          {
            //   name,
            //   birthdate,
            sign,
          }
        );
        return data;
      })
    );
    res.status(200).json(horoscopes);
  } catch (error) {
    console.error(error);
  }
}
