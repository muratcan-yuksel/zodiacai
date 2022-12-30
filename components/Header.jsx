import React from "react";
/* eslint-disable react/no-unescaped-entities */
const Header = () => {
  return (
    <header className="d-flex flex-column align-items-center justify-content-center p-5 ">
      <h1 style={{ width: "80%" }} className="text-center">
        {" "}
        Zodiac AI - The world's first AI-powered horoscope teller on the web
      </h1>
      <p style={{ width: "60%" }} className="text-center">
        "Welcome to Zodiac AI, the world's first AI-powered horoscope teller on
        the web. With the latest technology and ancient wisdom combined, our AI
        uses OpenAI to provide the most accurate daily horoscopes. Trust in the
        power of AI, with access to hundreds of thousands of books, rather than
        relying on the limited knowledge of mortals. Get your daily prediction
        now and see the difference for yourself."
      </p>
    </header>
  );
};

export default Header;
