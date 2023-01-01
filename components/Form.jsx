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
                price: "price_1MLHWTLMVMm28wM01tfe0aDD",
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
