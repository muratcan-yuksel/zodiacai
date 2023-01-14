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
// import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  // const { data, error } = useSWR(
  //   "http://localhost:3000/api/getLastGeneralSignObject",
  //   fetcher
  // );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;

  async function fetchData() {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://www.zodiacai.net/api/getLastGeneralSignObject"
      );
      setData(res.data.signsObject);
      console.log(res.data.signsObject);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
        <div className="container">
          <div className="row">
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="aries" horoscope={data.Aries} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="taurus" horoscope={data.Taurus} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="gemini" horoscope={data.Gemini} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="cancer" horoscope={data.Cancer} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="leo" horoscope={data.Leo} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="virgo" horoscope={data.Virgo} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="libra" horoscope={data.Libra} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="scorpio" horoscope={data.Scorpio} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="sagittarius" horoscope={data.Sagittarius} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="capricorn" horoscope={data.Capricorn} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="aquarius" horoscope={data.Aquarius} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="pisces" horoscope={data.Pisces} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
