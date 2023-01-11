import React, { useState } from "react";
import Image from "next/image";
import leo from "../assets/leosign.jpg";
import aries from "../assets/ariessign.jpg";
import aquarius from "../assets/aquariessign.jpg";
import capricorn from "../assets/capricornsign.jpg";
import gemini from "../assets/geminisign.jpg";
import libra from "../assets/librasign.jpg";
import pisces from "../assets/piscessign.jpg";
import sagittarius from "../assets/sagittariussign.jpg";
import scorpio from "../assets/scorpiosign.jpg";
import taurus from "../assets/taurussign.jpg";
import virgo from "../assets/virgosign.jpg";
import cancer from "../assets/cancersign.jpg";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

const ZodiacSign = ({ image, horoscope }) => {
  const [readMore, setReadMore] = useState(false);
  const text =
    " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius adipisci atque inventore totam dignissimos itaque animi ullam delectus fugiat consequuntur quod, libero veniam, blanditiis voluptate sint maiores assumenda laborum id. ";
  const images = {
    leo: leo,
    aries: aries,
    aquarius: aquarius,
    capricorn: capricorn,
    gemini: gemini,
    libra: libra,
    pisces: pisces,
    sagittarius: sagittarius,
    scorpio: scorpio,
    taurus: taurus,
    virgo: virgo,
    cancer: cancer,

    // add more images here
  };
  const src = images[image];
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>{image.charAt(0).toUpperCase() + image.slice(1)} </h2>
      <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.5 }}>
        <Image
          className={styles.image}
          src={src}
          alt={src}
          width={150}
          height={150}
        />
      </motion.div>
      <p className={styles.para}>
        {readMore ? horoscope : `${horoscope.substring(0, 80)}...`}
        <button className="btn" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "  read more"}
        </button>
      </p>
    </div>
  );
};

export default ZodiacSign;
