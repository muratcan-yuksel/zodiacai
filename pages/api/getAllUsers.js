import clientPromise from "../../lib/mongodb";

import axios from "axios";

export default async function getAllUsers(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");

  try {
    const users = await collection.find({}).toArray();
    const horoscopes = await Promise.allSettled(
      users.map(async (user) => {
        const { name, birthdate, sign, email } = user;
        const { data } = await axios.post(
          "http://localhost:3000/api/getUserHoroscopes",
          {
            sign,
          }
        );
        try {
          console.log(
            "this is data bro" + JSON.stringify(data.choices[0].text)
          );
          await axios.post("http://localhost:3000/api/sendMail", {
            email: email,
            subject: "Your daily horoscope",
            message: data.choices[0].text,
            name: name,
          });
        } catch (error) {
          console.log(error);
        }
        // send data to user.email
        return data;
      })
    );

    horoscopes.forEach((horoscope) => {
      if (horoscope.status === "fulfilled") {
        console.log(horoscope.value);
      } else {
        console.log(horoscope.reason);
      }
    });
    res.status(200).json({ message: "Emails sent to all users" });
  } catch (error) {
    console.error(error);
  }
}
