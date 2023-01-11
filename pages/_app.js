import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import { useEffect } from "react";
import { Andika } from "@next/font/google";
const font = Andika({ weight: "400", subsets: ["latin"] });
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ActionCall from "../components/ActionCall";
import Form from "../components/Form";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <main className={font.className}>
      <Navbar />
      <Header />
      <Component {...pageProps} />
      <ActionCall />
      <Form />
      <footer className="footer">
        <p> 2023 Zodiac AI. All rights reserved.</p>{" "}
        <p>Contact: mail@zodiacai.net</p>
      </footer>
    </main>
  );
}

export default MyApp;
