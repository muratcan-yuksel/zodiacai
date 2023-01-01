import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.STRIPE_API_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    lineItems,
    mode: "payment",
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}`,
  });

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ message: "Success" }),
  //   };
}
