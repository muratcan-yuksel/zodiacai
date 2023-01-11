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

export default function Home({ generalSigns }) {
  console.log(generalSigns);
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
              <ZodiacSign image="aries" horoscope={generalSigns.Aries} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="taurus" horoscope={generalSigns.Taurus} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="gemini" horoscope={generalSigns.Gemini} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="cancer" horoscope={generalSigns.Cancer} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="leo" horoscope={generalSigns.Leo} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="virgo" horoscope={generalSigns.Virgo} />
            </div>
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="libra" horoscope={generalSigns.Libra} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="scorpio" horoscope={generalSigns.Scorpio} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign
                image="sagittarius"
                horoscope={generalSigns.Sagittarius}
              />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign
                image="capricorn"
                horoscope={generalSigns.Capricorn}
              />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="aquarius" horoscope={generalSigns.Aquarius} />
            </div>{" "}
            <div style={{ width: "auto" }} className="col">
              {" "}
              <ZodiacSign image="pisces" horoscope={generalSigns.Pisces} />
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

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/getLastGeneralSignObject"
    );
    return {
      props: {
        generalSigns: response.data.signsObject,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}
