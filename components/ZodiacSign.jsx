import React from "react";
import leo from "../assets/leosign.jpg";
import Image from "next/image";

const ZodiacSign = ({ image }) => {
  const images = {
    leo: leo,
    // add more images here
  };
  const src = images[image];
  console.log(image);
  return (
    <div>
      <Image src={src} alt="leo" width={200} height={200} />
    </div>
  );
};

export default ZodiacSign;
