import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ZodiacSign from "../components/ZodiacSign";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ActionCall from "../components/ActionCall";
import PriceCard from "../components/PriceCard";
import Form from "../components/Form";
import axios from "axios";
import { backOff } from "exponential-backoff";

export default function Home({}) {
  // const signs = [
  //   "Aries",
  //   "Taurus",
  //   "Gemini",
  //   "Cancer",
  //   "Leo",
  //   "Virgo",
  //   "Libra",
  //   "Scorpio",
  //   "Sagittarius",
  //   "Capricorn",
  //   "Aquarius",
  //   "Pisces",
  // ];

  // const callGetSigns = async (sign) => {
  //   try {
  //     const apiUrl = "http://localhost:3000/api/getSigns";
  //     const response = await axios.post(apiUrl, {
  //       sign: sign,
  //     });
  //     console.log(response.data.choices[0].text);

  //     return response.data.choices[0].text;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const callAddGeneralSigns = async (signsObject) => {
  //   try {
  //     const apiUrl = "http://localhost:3000/api/addGeneralSigns";
  //     const response = await axios.post(apiUrl, {
  //       signsObject: signsObject,
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const [signsData, setSignsData] = useState();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // const getSigns = async () => {
  //   setLoading(true);
  //   setError(false);
  //   try {
  //     const data = await Promise.all(
  //       signs.map(async (sign) => {
  //         const signData = await callGetSigns(sign);
  //         console.log(signData);
  //         return signData;
  //       })
  //     );
  //     //creates an array of objects like arr[0].Taurus, not so good
  //     let objectArray = signs.map((elem, index) => {
  //       return {
  //         [elem]: data[index],
  //       };
  //     });
  //     //turns the array of objects into a single object
  //     let resultObject = {};
  //     for (let i = 0; i < objectArray.length; i++) {
  //       Object.assign(resultObject, objectArray[i]);
  //     }
  //     console.log(resultObject);

  //     callAddGeneralSigns(resultObject);

  //     setSignsData(resultObject);

  //     setLoading(false);
  //   } catch (error) {
  //     setError(true);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getSigns();
  //   // console.log(signsData);
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Zodiac AI</title>
        <meta
          name="description"
          content="Zodiac AI- World's first AI powered horoscope teller"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar />
        <Header />
        <div className="container">
          <div className="row">
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="aries" />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="taurus" />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="gemini" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="cancer" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="leo" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="virgo" />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="libra" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="scorpio" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="sagittarius" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="capricorn" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="aquarius" />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="pisces" />
            </div>
          </div>
        </div>
        <ActionCall />
        <Form />
      </main>
      <footer className={styles.footer}>
        <p> 2023 Zodiac AI. All rights reserved.</p>{" "}
        <p>Contact: mail@zodiacai.net</p>
      </footer>
    </div>
  );
}
