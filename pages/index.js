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

  const horoscopes = [];

  for (let i = 0; i < signs.length; i++) {
    makeRequest(signs[i]);
  }

  function getSignsRequest(body) {
    return axios.post("http://localhost:3000/api/getSigns", body);
  }

  async function makeRequest(req, res) {
    try {
      const body = req.body;
      const res = await backOff(() => getSignsRequest(body));
      console.log(res.data);
      horoscopes.push(res.data);
    } catch (error) {
      console.error(error);
    }

    let objectArray = signs.map((elem, index) => {
      return {
        [elem]: horoscopes[index],
      };
    });
    console.log(objectArray); // Output: [{ key1: "value1"},{ key2: "value2"}]
  }

  // makeRequest();

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
