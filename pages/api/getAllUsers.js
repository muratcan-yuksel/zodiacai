import clientPromise from "../../lib/mongodb";

import axios from "axios";

export default async function getAllUsers(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");

  try {
    const users = await collection.find({}).toArray();
    const horoscopes = await Promise.all(
      users.map(async (user) => {
        const { name, birthdate, sign, email } = user;
        const { data } = await axios.post(
          "http://localhost:3000/api/getUserHoroscopes",
          {
            //   name,
            //   birthdate,
            sign,
          }
        );
        try {
          console.log(
            "this is data bro" + JSON.stringify(data.choices[0].text)
          );
        } catch (error) {
          console.log(error);
        }
        // send data to user.email
        await axios.post("http://localhost:3000/api/sendMail", {
          email: email,
          subject: "Your daily horoscope",
          message: data.choices[0].text,
          name: name,
        });
        return data;
      })
    );
    res.status(200).json(horoscopes);
  } catch (error) {
    console.error(error);
  }
}
