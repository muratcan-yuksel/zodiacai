import React, { useState } from "react";
// import Checkout from "./Checkout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AXlw0TFGg-hzgayVBMyDbAUNZcHlwBgCxdfZxzymeYQ4JrZVFQc-t1mFcw2nyJR9AjgRKSWRxD3UftsD",
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
      plan_id: "P-1XE55367HE6198404MO56ZKQ",
    });
  };
  let apiHelper;
  const onApprove = (data, actions) => {
    console.log("paypal approved");

    console.log(data);
    console.log(props);

    // apiHelper(
    //   {
    //     orderID: data.orderID,
    //     subscriptionID: data.subscriptionID,
    //     paymentSource: data.paymentSource,
    //     facilitatorAccessToken: data.facilitatorAccessToken,
    //   },
    //   "/api/accounts/subscribe",
    //   "POST"
    //   // token
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       console.log("success");
    //       // show success message to user or navigate to a different page
    //     } else {
    //       console.log("failure");
    //       // show error message to user
    //     }
    //   });
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
