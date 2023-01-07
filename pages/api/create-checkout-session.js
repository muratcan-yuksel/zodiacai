import Stripe from "stripe";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function createCheckoutSession(req, res) {
  //these will be taken by form
  const { name, email, date, time, sign, birthLocation } = req.body;
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      timeOfBirth: time,
      birthDate: date,
      sign,
      birthLocation,
    },
  });
  console.log(customer);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id, // Associate the subscription with the customer
    payment_method_types: ["card"],
    line_items: [{ price: process.env.NEXT_PUBLIC_PRICE, quantity: 1 }],

    success_url: `http://localhost:3000/mypage?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/mypage?session_id={CHECKOUT_SESSION_ID}`,
  });
  // console.log(session);

  res.send(session.url);
}
