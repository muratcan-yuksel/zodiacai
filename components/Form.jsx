import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Form = () => {
  const router = useRouter();

  const handleBuy = async () => {
    try {
      const response = await axios.post("/api/create-checkout-session");
      console.log("hyyyyy" + response.data);
      router.push(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Buy product:
      <button onClick={handleBuy}>BUY!</button>
    </div>
  );
};

export default Form;
