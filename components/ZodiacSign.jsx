import React, { useState } from "react";
import leo from "../assets/leosign.jpg";
import aires from "../assets/airessign.jpg";
import Image from "next/image";

const ZodiacSign = ({ image }) => {
  const [readMore, setReadMore] = useState(false);
  const text =
    " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius adipisci atque inventore totam dignissimos itaque animi ullam delectus fugiat consequuntur quod, libero veniam, blanditiis voluptate sint maiores assumenda laborum id. ";
  const images = {
    leo: leo,
    aires: aires,
    // add more images here
  };
  const src = images[image];
  console.log(image);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Image src={src} alt="leo" width={250} height={250} />
      <p style={{ width: "250px" }}>
        {readMore ? text : `${text.substring(0, 80)}...`}
        <button className="btn" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "  read more"}
        </button>
      </p>
    </div>
  );
};

export default ZodiacSign;
