import clientPromise from "../../lib/mongodb";
import axios from "axios";

// this function, contrary to its name, doesn't show the users.
// It calls the users and gets their respective horoscopes
// then sends email to each one of them

export default async function getAllUsers(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("users");

  try {
    const users = await collection.find({}).toArray();
    const horoscopes = await Promise.allSettled(
      users.map(async (user) => {
        const { name, birthdate, sign, email, timeOfBirth, birthLocation } =
          user;
        const { data } = await axios.post(
          "https://www.zodiacai.net/api/getUserHoroscopes",
          {
            sign,
            name,
            birthdate,
            timeOfBirth,
            birthLocation,
          }
        );
        try {
          console.log(data.choices[0].text);
          await axios.post("https://www.zodiacai.net/api/sendMail", {
            email: email,
            subject: `${name} your daily horoscope is here! `,
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
