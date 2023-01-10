import React, { useState } from "react";
// import Checkout from "./Checkout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "subscription",
  // "enable-funding": "venmo",
  vault: true,
};

function PaypalCheckout({ props }) {
  const [ErrorMessage, setErrorMessage] = useState("");
  console.log(props);

  const onError = (data, actions) => {
    setErrorMessage("Error Occured");
  };

  const createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID,
    });
  };
  let apiHelper;
  const onApprove = (data, actions) => {
    //send email here also
    console.log("paypal approved");

    console.log(data);
    console.log(props);

    // const sendUserData = async () => {
    // orderID: data.orderID,
    //     subscriptionID: data.subscriptionID,
    //     paymentSource: data.paymentSource,
    //     facilitatorAccessToken: data.facilitatorAccessToken,
    //   try {
    //     await axios.post("http://localhost:3000/api/addUser", {
    //       name: props.name,
    //       email: props.email,
    //       subject: "Welcome to ZodiacAI",
    //       message: WelcomeMail.body,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // sendUserData();
  };

  return (
    <React.Fragment>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createSubscription={createSubscription}
          onApprove={onApprove}
          onError={onError}
        >
          Paypal Btnssss
        </PayPalButtons>
        {/* <Checkout /> */}
      </PayPalScriptProvider>
    </React.Fragment>
  );
}

export default PaypalCheckout;
