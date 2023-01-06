import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import { useEffect } from "react";
import { Andika } from "@next/font/google";
const font = Andika({ weight: "400", subsets: ["latin"] });
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
