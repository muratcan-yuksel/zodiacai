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
import EmailExample from "../components/EmailExample";
import ReactGA from "react-ga4";

//Initialize GA4
ReactGA.initialize("G-N2MLJ5SHN5");

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <main id="main">
      <Navbar />
      <Header />
      <Component {...pageProps} />
      <ActionCall />
      <EmailExample />
      <Form />
      <footer className="footer">
        <p> 2023 Zodiac AI. All rights reserved.</p>{" "}
        <p>Contact: mail@zodiacai.net</p>
      </footer>
    </main>
  );
}
const SendAnalytics = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
}; // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(SendAnalytics);

export default MyApp;
