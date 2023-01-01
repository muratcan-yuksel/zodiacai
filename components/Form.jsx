import React from "react";
import { checkout } from "./checkout";

const Form = () => {
  return (
    <div>
      Buy product:
      <button
        onClick={() => {
          checkout({
            lineItems: [
              {
                price: process.env.NEXT_PUBLIC_PRODUCT_PRICE,
                quantity: 1,
              },
            ],
          });
        }}
      >
        BUY!
      </button>
    </div>
  );
};

export default Form;
