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
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(
    "http://localhost:3000/api/getLastGeneralSignObject",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

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
              <ZodiacSign image="aries" horoscope={data.signsObject.Aries} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="taurus" horoscope={data.signsObject.Taurus} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="gemini" horoscope={data.signsObject.Gemini} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="cancer" horoscope={data.signsObject.Cancer} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="leo" horoscope={data.signsObject.Leo} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="virgo" horoscope={data.signsObject.Virgo} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="libra" horoscope={data.signsObject.Libra} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign
                image="scorpio"
                horoscope={data.signsObject.Scorpio}
              />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign
                image="sagittarius"
                horoscope={data.signsObject.Sagittarius}
              />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign
                image="capricorn"
                horoscope={data.signsObject.Capricorn}
              />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign
                image="aquarius"
                horoscope={data.signsObject.Aquarius}
              />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="pisces" horoscope={data.signsObject.Pisces} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// export async function getServerSideProps() {
//   try {
//     const response = await axios.get(
//       "https://www.zodiacai.net/api/getLastGeneralSignObject"
//     );
//     return {
//       props: {
//         generalSigns: response.data.signsObject,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         error: error.message,
//       },
//     };
//   }
// }
