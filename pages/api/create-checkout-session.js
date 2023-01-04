import Stripe from "stripe";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function createCheckoutSession(req, res) {
  const customer = await stripe.customers.create({
    email: "customer@example.com",
    name: "John Smith",
    address: {
      line1: "123 Main Street",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      country: "US",
    },
    description: "My customer",
  });
  // console.log(customer);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id, // Associate the subscription with the customer
    payment_method_types: ["card"],

    line_items: [{ price: process.env.NEXT_PUBLIC_PRICE, quantity: 1 }],
    success_url: `http://localhost:4242/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:4242/cancel.html?session_id={CHECKOUT_SESSION_ID}`,
  });
  console.log(session);

  res.send(session.url);
}
