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
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="myscript" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
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
    </>
  );
}

export default MyApp;
