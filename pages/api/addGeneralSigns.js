import clientPromise from "../../lib/mongodb";
import axios from "axios";

// const cron = require("node-cron");

const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const callGetSigns = async (sign) => {
  try {
    const apiUrl = "http://localhost:3000/api/getSigns";
    const response = await axios.post(apiUrl, {
      sign: sign,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
};

const saveSignsToDb = async (signsObject) => {
  // code to save data to the database
  console.log("I have been called for the database");
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("generalSigns");
  try {
    const user = await collection.insertOne({
      signsObject,
    });
  } catch (error) {
    console.error(error);
  }
};

const getSignsAndSave = async () => {
  try {
    const data = await Promise.all(
      signs.map(async (sign) => {
        const signData = await callGetSigns(sign);
        return signData;
      })
    );
    //creates an array of objects like arr[0].Taurus, not so good
    let objectArray = signs.map((elem, index) => {
      return {
        [elem]: data[index],
      };
    });
    //turns the array of objects into a single object
    let resultObject = {};
    for (let i = 0; i < objectArray.length; i++) {
      Object.assign(resultObject, objectArray[i]);
    }
    console.log(resultObject);
    saveSignsToDb(resultObject);
  } catch (error) {
    console.error(error);
  }
};

getSignsAndSave();
